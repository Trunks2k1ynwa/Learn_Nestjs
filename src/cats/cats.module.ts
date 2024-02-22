import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { Cats } from 'src/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// @Global()
@Module({
  imports: [
    forwardRef(() => CommonModule),
    ConfigModule,
    TypeOrmModule.forFeature([Cats]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
