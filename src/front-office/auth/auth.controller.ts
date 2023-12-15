import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthDtoSchema } from './dto/create-auth.dto';
import { async } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto, LoginAuthDtoSchema } from './dto/login-auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

@Controller('auth')
@ApiTags('Front Office - Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) { }

  @ApiBody({schema:zodToOpenAPI(CreateAuthDtoSchema)})
  @ApiResponse({status:200,schema:zodToOpenAPI(CreateAuthDtoSchema)})
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
  @ApiBody({schema:zodToOpenAPI(LoginAuthDtoSchema)})
  async login(@Body() loginAuthDto: LoginAuthDto)
  {
    const payload = LoginAuthDtoSchema.parse(loginAuthDto);
    try {
      const user = await this.authService.login(payload);
      const token = this.jwtService.sign({ sub: user.id });
      return {
        token: token
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
   }
}
