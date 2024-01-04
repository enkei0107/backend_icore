import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserProfiles } from '../../database/entities/user-profile.entity';
import { Users } from '../../database/entities/user.entity';
import { isSet } from 'util/types';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfiles)
    private userProfileRepository: Repository<UserProfiles>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(
    createUserProfileDto: CreateUserProfileDto,
    user: Users,
  ): Promise<UserProfiles> {
    return this.userRepository.manager.transaction(
      async (manager: EntityManager) => {
        try {
          if (createUserProfileDto.avatar) {
            await manager.update(Users, user.id, {
              avatar: createUserProfileDto.avatar,
            });
          }
          const profileExisting = await manager.findOne(UserProfiles, {
            where: {
              user_id: user.id,
            },
          });
          if (profileExisting) {
            await manager.update(
              UserProfiles,
              { user_id: user.id },
              {
                name:createUserProfileDto.name,
                gender:createUserProfileDto.gender,
                place_of_birth:createUserProfileDto.place_of_birth,
                religion:createUserProfileDto.religion
              }
            );
            return await manager.findOne(UserProfiles, {
              where: { user_id: user.id },
            });
          } else {
            const profile = manager.create(UserProfiles, {
              name: createUserProfileDto.name,
              gender: createUserProfileDto.gender,
              date_of_birth: createUserProfileDto.date_of_birth,
              place_of_birth: createUserProfileDto.place_of_birth,
              religion: createUserProfileDto.religion,
              user: user,
            });
            return await manager.save(UserProfiles, profile);
          }
        } catch (error) {
          throw error;
        }
      },
    );
  }

  async findOne(id: string): Promise<Users> {
    return this.userRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        profile: true,
        contacts: true,
        address: true,
      },
    });
  }
}
