import { Module } from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cat.controller';
import { HumansService } from './services/human.service';
import { HumansController } from './humans/humans.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    testController,
    CatsController,
    HumansController,
  ],
  providers: [AppService, HumansService],
})
export class AppModule {}
