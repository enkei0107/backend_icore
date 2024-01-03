import { Module } from '@nestjs/common';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { PermissionModule } from './permission/permission.module';
import { UserRolePermissionModule } from './user-role-permission/user-role-permission.module';

@Module({
  imports: [SettingModule, UserModule, UserRoleModule, PermissionModule, UserRolePermissionModule]
})
export class BackOfficeModule {}
