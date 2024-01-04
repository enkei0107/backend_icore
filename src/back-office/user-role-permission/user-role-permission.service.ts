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

  async create(createDto: CreateUserRoleDto): Promise<void> {
    const { role_id, permission_id } = createDto;

    for (const element of permission_id) {
      const existingUserRolePermissions =
        await this.rolePermissionRepository.findOne({
          where: {
            role_id,
            permission_id: element,
          },
        });

      if (!existingUserRolePermissions) {
        const newUserRolePermissions = this.rolePermissionRepository.create({
          role_id: role_id,
          permission_id: element,
        });
        await this.rolePermissionRepository.save(newUserRolePermissions);
      }
    }
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
