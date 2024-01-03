import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/entities/user.entity';
import { UserContacts } from '../../database/entities/user-contact.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { rateLimiterConfig } from 'src/config/interceptor/rate-limiter.config';
import { UserRoles } from 'src/database/entities/user-role.entity';
import { Roles } from 'src/database/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserContacts,UserRoles,Roles]),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    RateLimiterModule.registerAsync(rateLimiterConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
