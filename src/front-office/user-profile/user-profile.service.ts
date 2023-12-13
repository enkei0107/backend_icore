import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfiles } from './entities/user-profile.entity';
import { Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfiles)
    private userProfileRepository: Repository<UserProfiles>
  ) { }

  async create(createUserProfileDto: CreateUserProfileDto, user: Users): Promise<UserProfiles> {
      const profile = this.userProfileRepository.create({
        name: createUserProfileDto.name,
        gender: createUserProfileDto.gender,
        date_of_birth: createUserProfileDto.date_of_birth,
        place_of_birth: createUserProfileDto.place_of_birth,
        religion: createUserProfileDto.religion,
        user: user
      });
      return await this.userProfileRepository.save(profile);
  }

  async findOne(id: string): Promise<UserProfiles> {
    return await this.userProfileRepository.findOneByOrFail({
      user_id:id
    });
  }
}
