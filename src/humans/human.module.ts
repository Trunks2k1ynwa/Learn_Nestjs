import { Global, Module } from '@nestjs/common';
import { HumansController } from './humans.controller';
import { HumansService } from './human.service';
import { CatsModule } from 'src/cats/cats.module';
@Module({
  imports: [CatsModule],
  controllers: [HumansController],
  providers: [HumansService],
})
export class HumansModule {}
