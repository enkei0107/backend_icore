import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FrontOfficeModule } from './front-office/front-office.module';
import { InterceptorProvider } from './config/interceptor/interceptor.provider';
import { BackOfficeModule } from './back-office/back-office.module';
import { rateLimiterConfig } from './config/interceptor/rate-limiter.config';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    DatabaseModule,
    FrontOfficeModule,
    BackOfficeModule,
    RateLimiterModule.registerAsync(rateLimiterConfig),
  ],
  controllers: [AppController],
  providers: [AppService, ...InterceptorProvider],
  exports: [AppModule]
})
export class AppModule { }
