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
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cat.controller';

@Module({
  imports: [CatsModule, HumansModule],
  controllers: [AppController, testController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes({ path: 'humans/get-all', method: RequestMethod.GET });
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        // 'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
