import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto, CreateUserProfileDtoSchema } from './dto/create-user-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { UserProfileDtoResponse } from './responses/user-profile.response';

@Controller('user-profile')
@ApiTags('Front Office - User Profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({schema:zodToOpenAPI(CreateUserProfileDtoSchema)})
  @ApiResponse({})
  async create(@Body() createUserProfileDto: CreateUserProfileDto, @Request() req) {
    const payload = CreateUserProfileDtoSchema.parse(createUserProfileDto);
    try {
      const user = await this.userProfileService.create(payload, req.user);
      return { user: user };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({type:UserProfileDtoResponse})
  async findOne(@Request() req) {
    try {
      const user = await this.userProfileService.findOne(req.user.id);
      return new UserProfileDtoResponse(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
