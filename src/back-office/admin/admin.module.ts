import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from 'src/database/entities/admin.entity';
import { AdminContacts } from 'src/database/entities/admin-contact.entity';
import { RoleAdmins } from 'src/database/entities/role-admin.entity';
import { AdminRoles } from 'src/database/entities/admin-role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategy } from './admin.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admins, AdminContacts, RoleAdmins, AdminRoles]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_TTL },
    }),
  ],
  providers: [AdminService, AdminJwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
