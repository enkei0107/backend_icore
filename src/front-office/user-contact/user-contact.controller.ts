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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserContactService } from './user-contact.service';
import {
  CreateUserContactDto,
  CreateUserContactDtoSchema,
} from './dto/create-user-contact.dto';
import { UpdateUserContactDto } from './dto/update-user-contact.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

@Controller('user-contact')
@ApiTags('Front Office - User Contacts')
export class UserContactController {
  constructor(private readonly userContactService: UserContactService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ schema: zodToOpenAPI(CreateUserContactDtoSchema) })
  @ApiResponse({})
  async create(
    @Body() createUserContactDto: CreateUserContactDto,
    @Request() req,
  ) {
    const payload = CreateUserContactDtoSchema.parse(createUserContactDto);
    try {
      await this.userContactService.create(req.user, payload);
      return {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserContactDto: UpdateUserContactDto,
  ) {
    return this.userContactService.update(+id, updateUserContactDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({})
 async remove(@Param('id') id: string, @Request() req) {
    try {
      await this.userContactService.remove(req, id);
      return {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
