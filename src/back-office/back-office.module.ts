import { Module } from '@nestjs/common';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SettingModule, UserModule]
})
export class BackOfficeModule {}
