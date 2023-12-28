import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Settings } from 'src/database/entities/setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingService implements OnModuleInit {
  constructor(
    @InjectRepository(Settings)
    private readonly settingRepository: Repository<Settings>,
  ) {}
  private settings: Record<string, any> = {};
  async onModuleInit() {
    // throw new Error('Method not implemented.');
    await this.loadConfig();
  }
  //load config
  async loadConfig() {
    const allSettings = await this.settingRepository.find();
    this.settings = allSettings.reduce((acc, setting) => {
      setting.setting.forEach((item) => {
        const key = `${item.setting_name}_${setting.id}`;
        acc[key] = item.value;
      });
      return acc;
    }, {});
  }
  getValue(settingName: string, id: string): any {
    const key = `${settingName}_${id}`;
    return this.settings[key];
  }




  async findOneById(id: string): Promise<Settings> {
    return await this.settingRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }
  async findAll() {
    return await this.settingRepository.find();
  }
}
