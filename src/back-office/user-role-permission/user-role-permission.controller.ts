import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserRolePermissionService } from './user-role-permission.service';
import {
  CreateUserRoleDto,
  CreateUserRoleDtoSchema,
} from './dto/create-user-role-permission.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

@Controller('backoffice/user-role-permissions')
@ApiTags('Back Office - User Role Permissions')
export class UserRolePermissionController {
  constructor(
    private readonly userRolePermissionService: UserRolePermissionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Role Permission' })
  @ApiBody({ schema: zodToOpenAPI(CreateUserRoleDtoSchema) })
  @ApiResponse({})
  async create(@Body() createDto: CreateUserRoleDto) {
    const payload = CreateUserRoleDtoSchema.parse(createDto);
    try {
      await this.userRolePermissionService.create(payload);
      return {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Permission' })
  @ApiResponse({})
  async remove(@Param('id') id: string) {
    try {
      await this.userRolePermissionService.remove(id);
      return {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
