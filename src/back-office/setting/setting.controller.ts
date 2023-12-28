import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { Settings } from 'src/database/entities/setting.entity';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Settings> {
    try {
      return await this.settingService.findOneById(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  async findAll() {
    try {
      return await this.settingService.findAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
