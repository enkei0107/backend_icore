import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthDtoSchema } from './dto/create-auth.dto';
import { async } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto, LoginAuthDtoSchema } from './dto/login-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  AuthDtoResponse,
  AuthResponseSchema,
} from './responses/auth.rensponse';
import { Oauth2Dto, Oauth2DtoSchema } from './dto/oauth2-auth.dto';

@Controller('auth')
@ApiTags('Front Office - Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'User Register' })
  @ApiBody({ schema: zodToOpenAPI(CreateAuthDtoSchema) })
  @ApiResponse({ status: 201, type: AuthResponseSchema })
  async create(@Body() createAuthDto: CreateAuthDto) {
    const payload = CreateAuthDtoSchema.parse(createAuthDto);
    try {
      const user = await this.authService.create(payload);
      const token = this.jwtService.sign({ sub: user.id });
      return new AuthDtoResponse({ token, user });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ schema: zodToOpenAPI(LoginAuthDtoSchema) })
  @ApiResponse({ type: AuthResponseSchema })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const payload = LoginAuthDtoSchema.parse(loginAuthDto);
    try {
      const user = await this.authService.login(payload);
      const token = this.jwtService.sign({ sub: user.id });
      return new AuthDtoResponse({ token, user });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('oauth2')
  @ApiBody({ schema: zodToOpenAPI(Oauth2DtoSchema) })
  async oauth2(@Body() oauthDto: Oauth2Dto) {
    const payload = Oauth2DtoSchema.parse(oauthDto);
    try {
      const user = await this.authService.oauth2(payload);
      const token = this.jwtService.sign({ sub: user.id });
      return new AuthDtoResponse({ token, user });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
