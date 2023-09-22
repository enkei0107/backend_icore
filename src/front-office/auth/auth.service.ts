import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserContacts } from '../user-contact/entities/user-contact.entity';
import { error } from 'console';
import * as bcrypt from 'bcryptjs';
import { async } from 'rxjs';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(UserContacts)
    private userContactsRepository: Repository<UserContacts>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<any> {
    const unique_email = await this.userContactsRepository.findOne({
      where: {
        address: createAuthDto.email,
      },
    });
    if (unique_email) {
      throw new error('The Email Has Been Taken');
    }
    const hashed_password = await bcrypt.hash(createAuthDto.password, 10);
    const new_user = await this.usersRepository.create({
      username: createAuthDto.username,
      password: hashed_password,
    });

    await this.userContactsRepository.create({
      provider:UserContactProviderEnum.EMAIL,
      address:createAuthDto.email,
      'user':new_user
    });
    return new_user;
  }

  async login(loginAuthDto: LoginAuthDto): Promise<any> {
    const user = await this.userContactsRepository.findOneOrFail({
      where:{
        'provider':UserContactProviderEnum.EMAIL,
        'address':loginAuthDto.email,
        'is_primary':true
      },
      relations:['user']
    });
  }
}
