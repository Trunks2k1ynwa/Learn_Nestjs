import { PublicMiddleware } from 'src/middlewares/public.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HumansController } from './humans.controller';
import { HumansService } from './human.service';
import { CatsModule } from 'src/cats/cats.module';
import { TestMiddleware } from 'src/middlewares/test.middleware';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
@Module({
  imports: [CatsModule],
  controllers: [HumansController],
  providers: [HumansService],
})
export class HumansModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PublicMiddleware, TestMiddleware, LoggerMiddleware)
      .forRoutes(HumansController);
  }
}
