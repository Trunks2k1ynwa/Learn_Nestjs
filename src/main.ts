import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { logger } from './middlewares/function.middleware';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const config = new DocumentBuilder()
    .setTitle('API NestJS Example')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('Nest')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, {
    useGlobalPrefix: true,
    swaggerUrl: 'http://localhost:3000/api/default',
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();
  // or "app.enableVersioning()"
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    logger,
    compression(),
    helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
  );
  app.use(cookieParser());
  app.use(
    session({
      secret: 'natours',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(configService.get('PORT'));
}
bootstrap();
