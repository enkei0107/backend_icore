import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfiles } from './entities/user-profile.entity';
import { Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';
import { isSet } from 'util/types';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfiles)
    private userProfileRepository: Repository<UserProfiles>,

    @InjectRepository(Users)
    private userRepository:Repository<Users>
  ) { }

  
  async create(createUserProfileDto: CreateUserProfileDto, user: Users): Promise<UserProfiles> {
    try {
      if(isSet(createUserProfileDto.avatar)){
        const users= this.userRepository.update(user.id,{
          avatar:createUserProfileDto.avatar
        });
      }
        const profile = this.userProfileRepository.create({
          name: createUserProfileDto.name,
          gender: createUserProfileDto.gender,
          date_of_birth: createUserProfileDto.date_of_birth,
          place_of_birth: createUserProfileDto.place_of_birth,
          religion: createUserProfileDto.religion,
          user: user
        });
        return await this.userProfileRepository.save(profile);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<UserProfiles> {
    return await this.userProfileRepository.findOneByOrFail({
      user_id:id
    });
  }
}
