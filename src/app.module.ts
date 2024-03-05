import { Module } from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HumansModule } from './humans/human.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AccountModule } from './account/account.module';
@Module({
  imports: [
    CatsModule,
    HumansModule,
    CommonModule,
    AccountModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      load: [databaseConfig], //Load one or more config that have value of env
      isGlobal: true, // All module can use this config
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // useClass: TypeOrmConfigService,
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
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
  ],
})
export class AppModule {}
