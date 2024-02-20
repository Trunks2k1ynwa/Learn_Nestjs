import { Module } from '@nestjs/common';
import { HumansController } from './humans.controller';
import { HumansService } from './human.service';
import { CatsModule } from 'src/cats/cats.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [CatsModule],
  controllers: [HumansController],
  providers: [HumansService],
  // exports: [TypeOrmModule],
})
export class HumansModule {}
