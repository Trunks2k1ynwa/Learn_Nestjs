import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { Cats } from 'src/entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import catConfig from 'src/config/cat.config';
// @Global()
@Module({
  imports: [
    forwardRef(() => CommonModule),
    ConfigModule.forFeature(catConfig),
    TypeOrmModule.forFeature([Cats]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
