import { Module } from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HumansModule } from './humans/human.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    CatsModule,
    HumansModule,
    CommonModule,
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   entities: [User],
    //   synchronize: true,
    //   autoLoadEntities: true,
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
export class AppModule {}
