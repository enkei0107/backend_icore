import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/user.entity';
import { Roles } from 'src/database/entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,Roles])],
  providers: [UserRoleService],
  controllers: [UserRoleController]
})
export class UserRoleModule {}
