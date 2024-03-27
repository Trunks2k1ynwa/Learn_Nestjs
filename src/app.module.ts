import { Module } from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HumansModule } from './humans/human.module';
import { APP_GUARD } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AccountModule } from './account/account.module';
import { TypeOrmConfigService } from './config/database.service';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { AudioConsumer } from './account/consumers/audio.consumer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
@Module({
  imports: [
    CatsModule,
    HumansModule,
    CommonModule,
    AccountModule,
    FileModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 12000, // seconds
      max: 10,
    }), // maximum number of items in cache}),
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      load: [databaseConfig], //Load one or more config that have value of env
      isGlobal: true, // All module can use this config
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    //Module is use to config Queues
    BullModule.forRootAsync('alternative-config', {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          port: configService.get('REDIS_PORT'),
          host: configService.get('REDIS_HOST'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    FileModule,
    AuthModule,
  ],
  controllers: [AppController, testController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

    AudioConsumer,
  ],
})
export class AppModule {}
