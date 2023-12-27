import { Injectable } from '@nestjs/common';
import { CreateUserContactDto } from './dto/create-user-contact.dto';
import { UpdateUserContactDto } from './dto/update-user-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserContacts } from '../../database/entities/user-contact.entity';
import { Repository } from 'typeorm';
import { Users } from '../../database/entities/user.entity';

@Injectable()
export class UserContactService {
  constructor(
    @InjectRepository(UserContacts)
    private userContactRepository: Repository<UserContacts>,
  ) {}
  async create(user: Users, createUserContactDto: CreateUserContactDto) {
    const exist = await this.userContactRepository.findOneBy({
      user_id: user.id,
      is_primary: true,
      provider: createUserContactDto.provider,
    });
    if (exist) {
      const data = this.userContactRepository.create({
        provider: createUserContactDto.address,
        address: createUserContactDto.address,
        is_primary: false,
        user: user,
      });
      return await this.userContactRepository.save(data);
    } else {
      const data = this.userContactRepository.create({
        provider: createUserContactDto.address,
        address: createUserContactDto.address,
        is_primary: true,
        user: user,
      });
      return await this.userContactRepository.save(data);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} userContact`;
  }

  update(id: number, updateUserContactDto: UpdateUserContactDto) {
    return `This action updates a #${id} userContact`;
  }

  async remove(user: Users, id: string) {
    const contact = await this.userContactRepository.findOneOrFail({
      where: {
        id: id,
        user_id: user.id,
      },
    });
    await this.userContactRepository.delete(contact.id);
  }
}
