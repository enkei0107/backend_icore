import { Module } from '@nestjs/common';
import { UserRolePermissionService } from './user-role-permission.service';
import { UserRolePermissionController } from './user-role-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolePermissions } from 'src/database/entities/user-role-permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserRolePermissions])],
  providers: [UserRolePermissionService],
  controllers: [UserRolePermissionController]
})
export class UserRolePermissionModule {}
