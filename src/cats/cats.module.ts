import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
// @Global()
@Module({
  imports: [forwardRef(() => CommonModule), ConfigModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
