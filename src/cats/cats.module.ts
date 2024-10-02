import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { ConfigModule } from '@nestjs/config';
import { Cats } from 'src/entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import catConfig from 'src/config/cat.config';
import { TestMiddleware } from 'src/middlewares/test.middleware';
import { CommonModule } from 'src/common/common.module';
// @Global()
@Module({
  imports: [
    forwardRef(() => CommonModule),
    ConfigModule.forFeature(catConfig),
    TypeOrmModule.forFeature([Cats]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes(CatsController);
  }
  static forRoot(entities = [], options?): DynamicModule {
    const providers = [];
    return {
      module: CatsModule,
      global: true,
      providers: providers,
      exports: providers,
    };
  }
}
