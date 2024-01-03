import { Module } from '@nestjs/common';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  imports: [SettingModule, UserModule, UserRoleModule]
})
export class BackOfficeModule {}
