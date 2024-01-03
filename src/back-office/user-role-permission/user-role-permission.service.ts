import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRolePermissions } from 'src/database/entities/user-role-permission.entity';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user-role-permission.dto';

@Injectable()
export class UserRolePermissionService {
  constructor(
    @InjectRepository(UserRolePermissions)
    private readonly rolePermissionRepository: Repository<UserRolePermissions>,
  ) {}

  async create(createDto: CreateUserRoleDto): Promise<UserRolePermissions> {
    const exists = await this.rolePermissionRepository.findOne({
      where: {
        role_id: createDto.role_id,
        permission_id: createDto.permission_id,
      },
    });
    if (exists) {
      return exists;
    }
    const data = this.rolePermissionRepository.create({
      role_id: createDto.role_id,
      permission_id: createDto.permission_id,
    });
    return await this.rolePermissionRepository.save(data);
  }
  async remove(id: string): Promise<UserRolePermissions> {
    const data = await this.rolePermissionRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    await this.rolePermissionRepository.delete(id);
    return data;
  }
}
