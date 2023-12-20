import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { EntityManager, Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';
import { CreateUserAddressDto } from './dto/create-user-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
  ) {}

  async updateOrCreate(
    user: Users,
    userAddressDto: CreateUserAddressDto,
  ): Promise<UserAddress> {
    const result = await this.userAddressRepository.findOneBy({
      user_id: user.id,
    });

    if (result) {
      await this.userAddressRepository.update(
        { user_id: user.id },
        userAddressDto,
      );
      return await this.userAddressRepository.findOneBy({ user_id: user.id });
    } else {
      const newAddress = this.userAddressRepository.create({
        ...userAddressDto,
        user: user,
      });
      return await this.userAddressRepository.save(newAddress);
    }
  }
}
