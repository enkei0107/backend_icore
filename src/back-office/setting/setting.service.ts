import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Settings } from 'src/database/entities/setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingService implements OnModuleInit {
  private static settings: Record<string, any> = {};
  constructor(
    @InjectRepository(Settings)
    private readonly settingRepository: Repository<Settings>,
  ) {}
  async onModuleInit() {
    // throw new Error('Method not implemented.');
    await this.loadConfig();
  }
  //load config
  async loadConfig() {
    const allSettings = await this.settingRepository.find();
    if(allSettings){
      SettingService.settings = allSettings.reduce((acc, setting) => {
        setting.setting.forEach((item) => {
          const key = `${item.setting_name}_${setting.id}`;
          acc[key] = item.value;
        });
        return acc;
      }, {});
    }
  }
  getValue(settingName: string, id: string): any {
    const key = `${settingName}_${id}`;
    return SettingService.settings[key];
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
