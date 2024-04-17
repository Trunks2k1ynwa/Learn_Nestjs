import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HumansController } from './humans.controller';
import { HumansService } from './human.service';
import { CatsModule } from 'src/cats/cats.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
@Module({
  imports: [CatsModule],
  controllers: [HumansController],
  providers: [HumansService],
})
export class HumansModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('humans');
  }
}
