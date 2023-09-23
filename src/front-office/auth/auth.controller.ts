import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthDtoSchema } from './dto/create-auth.dto';
import { async } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) { }

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const payload = CreateAuthDtoSchema.parse(createAuthDto);
    try {
      const user = await this.authService.create(payload);
      const token = this.jwtService.sign({ sub: user.id });
      return {
        token: token
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login() { }
}
