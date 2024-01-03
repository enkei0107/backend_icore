import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Request as ExpressRequest, Router } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ShowPermissionItem,
  ShowPermissionItemSwagger,
} from './response/show-permission.response';
@Controller('backoffice/permissions')
@ApiTags('Back Office - System Permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: 'Show Permissions' })
  @ApiResponse({ type: ShowPermissionItemSwagger })
  async get() {
    try {
      const permissions = await this.permissionService.get();
      const mappedPermissions = permissions.map(
        (permission) =>
          ({
            id: permission.id,
            end_point: permission.end_point,
            created_at: permission.created_at,
            updated_at: permission.updated_at,
          } as ShowPermissionItem),
      );

      return mappedPermissions;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Post()
  @ApiOperation({ summary: 'Synchronized Permission Endpoint' })
  @ApiResponse({})
  async synchronized(@Request() req: ExpressRequest) {
    try {
      return await this.permissionService.synchronized(req);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
