import { Module } from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cat.controller';

@Module({
  imports: [],
  controllers: [AppController, testController, CatsController],
  providers: [AppService],
})
export class AppModule {}
