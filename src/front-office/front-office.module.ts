import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserContactModule } from './user-contact/user-contact.module';

@Module({
  imports: [UserModule, AuthModule, UserProfileModule, UserContactModule]
})
export class FrontOfficeModule {}
