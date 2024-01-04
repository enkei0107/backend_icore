import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/database/entities/role.entity';
import { Users } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
  ) {}
  async findById(id: string): Promise<Users> {
    return await this.userRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['role.role.user_roles.permission'],
    });
  }
  async findByRoleId(id: string) {
    return await this.roleRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['user_roles.permission'],
    });
  }
}
