import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  app.use(compression());

  // or "app.enableVersioning()"
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cookieParser());
  await app.listen(configService.get('PORT'));
}
bootstrap();
