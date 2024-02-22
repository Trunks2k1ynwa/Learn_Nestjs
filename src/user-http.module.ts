import { Module } from '@nestjs/common';
import { HumansModule } from './humans/human.module';
import { HumansService } from './humans/human.service';
import { HumansController } from './humans/humans.controller';

@Module({
  imports: [HumansModule],
  providers: [HumansService],
  controllers: [HumansController],
})
export class UserHttpModule {}
