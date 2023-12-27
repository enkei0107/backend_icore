import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserContacts } from '../../database/entities/user-contact.entity';
import { error } from 'console';
import * as bcrypt from 'bcryptjs';
import { async } from 'rxjs';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserContactProviderEnum } from 'src/config/enum/user/user-contact-provider.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(UserContacts)
    private userContactsRepository: Repository<UserContacts>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Users> {
    const unique_email = await this.userContactsRepository.findOne({
      where: {
        address: createAuthDto.email,
      },
    });
    if (unique_email) {
      throw new error('The Email Has Been Taken');
    }

    // create new user
    const hashed_password = await bcrypt.hash(createAuthDto.password, 10);
    const new_user = this.usersRepository.create({
      username: createAuthDto.username,
      account_type: createAuthDto.account_type,
      password: hashed_password,
      login_at: new Date(),
    });
    await this.usersRepository.save(new_user);

    //create user contacts
    const user_contacts = this.userContactsRepository.create({
      provider: UserContactProviderEnum.EMAIL,
      address: createAuthDto.email,
      user: new_user,
    });
    await this.userContactsRepository.save(user_contacts);

    return new_user;
  }

  async login(loginAuthDto: LoginAuthDto): Promise<Users> {
    const user = await this.userContactsRepository.findOne({
      where: {
        provider: UserContactProviderEnum.EMAIL,
        address: loginAuthDto.email,
        is_primary: true,
      },
      relations: ['user'],
    });
    if (
      user &&
      bcrypt.compareSync(loginAuthDto.password, user['user'].password)
    ) {
      return user['user'];
    }
    throw new Error('Email or Password is invalid');
  }
}
