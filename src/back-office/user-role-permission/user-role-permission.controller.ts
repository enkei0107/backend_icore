import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserRolePermissionService } from './user-role-permission.service';
import { CreateUserRoleDto } from './dto/create-user-role-permission.dto';

@Controller('user-role-permission')
export class UserRolePermissionController {
  constructor(
    private readonly userRolePermissionService: UserRolePermissionService,
  ) {}

  @Post()
  async create(@Body() createDto: CreateUserRoleDto) {
    try {
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
