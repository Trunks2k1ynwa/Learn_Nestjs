import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HumansModule } from './humans/human.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './cat.entity';
import { DataSource } from 'typeorm';
@Module({
  imports: [
    CatsModule,
    HumansModule,
    CommonModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Trung2001@',
      database: 'natours',
      entities: [Cats],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // MongooseModule.forRoot('mongodb://localhost/test', {
    //   connectionName: 'cats',
    // }),
    // MongooseModule.forRoot('mongodb://localhost/users', {
    //   connectionName: 'users',
    // }),
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
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
