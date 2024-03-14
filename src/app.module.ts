import { Module } from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HumansModule } from './humans/human.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AccountModule } from './account/account.module';
import { TypeOrmConfigService } from './config/database.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { AudioConsumer } from './account/consumers/audio.consumer';
@Module({
  imports: [
    CatsModule,
    HumansModule,
    CommonModule,
    AccountModule,
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
      // useFactory: (configService: ConfigService) => ({
      //   type: 'mysql',
      //   host: configService.get('DB_HOST'),
      //   port: configService.get('DB_PORT'),
      //   username: configService.get('DB_USERNAME'),
      //   password: configService.get('DB_PASSWORD'),
      //   database: configService.get('DB_DATABASE'),
      //   synchronize: true,
      //   autoLoadEntities: true,
      // }),
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
  ],

  controllers: [AppController, testController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AudioConsumer,
  ],
})
export class AppModule {}
