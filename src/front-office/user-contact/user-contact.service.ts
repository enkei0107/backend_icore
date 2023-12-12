import { Injectable } from '@nestjs/common';
import { CreateUserContactDto } from './dto/create-user-contact.dto';
import { UpdateUserContactDto } from './dto/update-user-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserContacts } from './entities/user-contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserContactService {
  constructor(
    @InjectRepository(UserContacts)
    private userContactRepository: Repository<UserContacts>
  ) {

  }
  create(createUserContactDto: CreateUserContactDto) {
    return 'This action adds a new userContact';
  }

  findAll() {
    return `This action returns all userContact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userContact`;
  }

  update(id: number, updateUserContactDto: UpdateUserContactDto) {
    return `This action updates a #${id} userContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} userContact`;
  }
}
