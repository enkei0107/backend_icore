import { Injectable } from '@nestjs/common';
import { CreateUserContactDto } from './dto/create-user-contact.dto';
import { UpdateUserContactDto } from './dto/update-user-contact.dto';

@Injectable()
export class UserContactService {
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
