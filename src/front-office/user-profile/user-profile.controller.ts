import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto, CreateUserProfileDtoSchema } from './dto/create-user-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

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
  @ApiBasicAuth()
  async findOne(@Request() req) {
    try {
      const user = await this.userProfileService.findOne(req.user.id);
      return { user };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
