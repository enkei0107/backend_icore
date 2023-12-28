import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import {
  UserPaginateSwaggerSchema,
  UserResponseDto,
} from './response/user-paginate.response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('backoffice/user')
@ApiTags('Back Office - Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({ type: UserPaginateSwaggerSchema })
  async findAll(@Paginate() query: PaginateQuery) {
    const data = await this.userService.findAll(query);
    return new UserResponseDto(data);
  }
}
