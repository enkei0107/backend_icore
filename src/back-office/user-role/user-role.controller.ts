import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RolePermissionDtoResponse,
  RolePermissionDtoResponseSwagger,
} from './response/show-permission-by-role.response';

@Controller('backoffice/user-role')
@ApiTags('Back Office - User Role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Show Permission By User' })
  async findByUserId(@Param('id') id: string) {
    try {
      return await this.userRoleService.findById(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('role/:id')
  @ApiOperation({ summary: 'Show Permission By Role' })
  @ApiResponse({ type: RolePermissionDtoResponseSwagger })
  async findByRoleId(@Param('id') id: string) {
    try {
      const data = await this.userRoleService.findByRoleId(id);
      return new RolePermissionDtoResponse(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
