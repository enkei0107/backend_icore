import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { UserContacts } from '../user-contact/entities/user-contact.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserContacts]),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule]
})
export class AuthModule { }
