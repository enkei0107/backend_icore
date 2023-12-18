import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  // Open Api
  const config = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setDescription('Backend API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
