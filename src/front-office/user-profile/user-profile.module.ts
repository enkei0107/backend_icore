import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfiles } from '../../database/entities/user-profile.entity';
import { Users } from '../../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfiles, Users])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
