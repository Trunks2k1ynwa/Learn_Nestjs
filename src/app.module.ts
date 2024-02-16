import { Module } from '@nestjs/common';
import { AppController, testController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HumansModule } from './humans/human.module';

@Module({
  imports: [CatsModule, HumansModule],
  controllers: [AppController, testController],
  providers: [AppService],
})
export class AppModule {}
