import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FrontOfficeModule } from './front-office/front-office.module';
import { InterceptorProvider } from './config/interceptor/interceptor.provider';
import { BackOfficeModule } from './back-office/back-office.module';

@Module({
  imports: [DatabaseModule, FrontOfficeModule, BackOfficeModule],
  controllers: [AppController],
  providers: [AppService, ...InterceptorProvider],
})
export class AppModule {}
