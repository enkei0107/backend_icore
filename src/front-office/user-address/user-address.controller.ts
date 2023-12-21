import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateUserAddressDto,
  CreateUserAddressDtoSchema,
} from './dto/create-user-address.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtension,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

@Controller('user-address')
@ApiTags('Front Office - User Address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Or Create User Address' })
  @ApiBearerAuth()
  @ApiBody({ schema: zodToOpenAPI(CreateUserAddressDtoSchema) })
  @ApiResponse({})
  async create(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @Request() req,
  ) {
    const payload = CreateUserAddressDtoSchema.parse(createUserAddressDto);
    try {
      await this.userAddressService.updateOrCreate(req.user, payload);
      return {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
