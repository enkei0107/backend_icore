import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfiles } from './entities/user-profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserProfiles])],
  controllers: [UserProfileController],
  providers: [UserProfileService]
})
export class UserProfileModule {}
