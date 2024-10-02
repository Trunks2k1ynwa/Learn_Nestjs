import { Module, forwardRef } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { CommonService } from './common.service';
import { Cats } from 'src/entities/cat.entity';

@Module({
  imports: [forwardRef(() => CatsModule.forRoot([Cats]))],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
