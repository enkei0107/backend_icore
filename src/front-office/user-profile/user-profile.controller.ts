import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto, CreateUserProfileDtoSchema } from './dto/create-user-profile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserProfileDto: CreateUserProfileDto, @Request() req) {
    const payload = CreateUserProfileDtoSchema.parse(createUserProfileDto);
    try {
      const user=this.userProfileService.create(payload, req.user);
      return {user:user};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
