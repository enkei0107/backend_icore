import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FrontOfficeModule } from './front-office/front-office.module';

@Module({
  imports: [DatabaseModule, FrontOfficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
