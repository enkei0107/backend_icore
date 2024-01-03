import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../database/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserContacts } from '../../database/entities/user-contact.entity';
import { error } from 'console';
import * as bcrypt from 'bcryptjs';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserContactProviderEnum } from 'src/config/enum/user/user-contact-provider.enum';
import axios, { AxiosResponse } from 'axios';
import { Oauth2Dto } from './dto/oauth2-auth.dto';
import { OauthProviderEnum } from 'src/config/enum/auth/oauth-provider.enum';
import { OauthFormatDto } from './dto/oauth-format.dto';
import { UserAccountTypeEnum } from 'src/config/enum/user/user-account-type.enum';
import { UserRoles } from 'src/database/entities/user-role.entity';
import { Roles } from 'src/database/entities/role.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(UserContacts)
    private userContactsRepository: Repository<UserContacts>,

    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,

    @InjectRepository(UserRoles)
    private userRoleRepository: Repository<UserRoles>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Users> {
    return this.usersRepository.manager.transaction(
      async (manager: EntityManager) => {
        try {
          const uniqueEmail = await manager.findOne(UserContacts, {
            where: {
              provider: UserContactProviderEnum.EMAIL,
              address: createAuthDto.email.toLocaleLowerCase(),
            },
          });
          if (uniqueEmail) {
            throw new Error('The Email Has Been Taken');
          }

          const role = await manager.findOneOrFail(Roles, {
            where: {
              name: createAuthDto.role,
            },
          });
          const hashed_password = await bcrypt.hash(createAuthDto.password, 10);
          const newUser = manager.create(Users, {
            username: createAuthDto.username,
            password: hashed_password,
            login_at: new Date(),
          });
          await manager.save(Users, newUser);
          const newContacts = manager.create(UserContacts, {
            provider: UserContactProviderEnum.EMAIL,
            address: createAuthDto.email.toLocaleLowerCase(),
            user: newUser,
          });
          const userRole = manager.create(UserRoles, {
            user: newUser,
            role: role,
          });
          await manager.save(UserContacts, newContacts);
          await manager.save(UserRoles, userRole);
          return await manager.findOneOrFail(Users, {
            where: {
              id: newUser.id,
            },
            relations: ['role.role'],
          });
        } catch (error) {
          throw new Error(error);
        }
      },
    );
  }

  async login(loginAuthDto: LoginAuthDto): Promise<Users> {
    const user = await this.userContactsRepository.findOne({
      where: {
        provider: UserContactProviderEnum.EMAIL,
        address: loginAuthDto.email.toLocaleLowerCase(),
        is_primary: true,
      },
      relations: ['user', 'user.role.role'],
    });
    if (
      user &&
      bcrypt.compareSync(loginAuthDto.password, user['user'].password)
    ) {
      return user['user'];
    }
    throw new Error('Email or Password is invalid');
  }
  async oauth2(oauthDto: Oauth2Dto) {
    try {
      let data: OauthFormatDto;
      switch (oauthDto.provider) {
        case OauthProviderEnum.GOOGLE:
          data = await this.oauthGoogle(oauthDto.token);
          break;
        case OauthProviderEnum.FACEBOOK:
          throw new Error(
            'Provider ' + OauthProviderEnum.FACEBOOK + ' Cant Be Access',
          );
          break;
        case OauthProviderEnum.GITHUB:
          data = await this.oauthGithub(oauthDto.token);
          break;
        case OauthProviderEnum.MICROSOFT:
          throw new Error(
            'Provider ' + OauthProviderEnum.MICROSOFT + ' Cant Be Access',
          );
          break;
        default:
          return null;
      }

      const findUser = await this.userContactsRepository.findOne({
        where: {
          provider: UserContactProviderEnum.EMAIL,
          address: data.email,
          is_primary: true,
        },
        relations: ['user', 'user.role.role'],
      });
      if (findUser) {
        return findUser['user'];
      } else {
        return this.usersRepository.manager.transaction(
          async (manager: EntityManager) => {
            const role = await this.roleRepository.findOneOrFail({
              where: {
                name: UserAccountTypeEnum.BASIC,
              },
            });
            const new_user = this.usersRepository.create({
              username: await this.generatedUniqueUsername(data.name),
              avatar: data.avatar,
              login_at: new Date(),
            });
            await this.usersRepository.save(new_user);
            const user_role = this.userRoleRepository.create({
              user: new_user,
              role: role,
            });
            await this.userRoleRepository.save(user_role);

            //create user contacts
            const user_contacts = this.userContactsRepository.create({
              provider: UserContactProviderEnum.EMAIL,
              address: data.email,
              is_verified: true,
              user: new_user,
            });
            await this.userContactsRepository.save(user_contacts);
            return manager.findOneOrFail(Users, {
              where: {
                id: new_user.id,
              },
              relations: ['role.role'],
            });
          },
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  protected async generatedUniqueUsername(
    baseUsername: string,
    suffix: number = 1,
  ): Promise<string> {
    const username = suffix === 1 ? baseUsername : `${baseUsername} ${suffix}`;

    const existingUser = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
    if (existingUser) {
      return this.generatedUniqueUsername(baseUsername, suffix + 1);
    }

    return username;
  }
  protected async oauthGithub(accessToken: string): Promise<OauthFormatDto> {
    try {
      const getEmail: AxiosResponse = await axios.get(
        'https://api.github.com/user/emails',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const getUserInfo: AxiosResponse = await axios.get(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return {
        email: getEmail?.data[0]?.email.toLowerCase(),
        name: getUserInfo?.data?.name,
        avatar: getUserInfo?.data?.avatar_url,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  protected async oauthGoogle(accessToken: string): Promise<OauthFormatDto> {
    try {
      const getUserInfo: AxiosResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(getUserInfo);
      return {
        email: getUserInfo?.data.email.toLowerCase(),
        name: getUserInfo?.data?.name,
        avatar: getUserInfo?.data?.picture,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
