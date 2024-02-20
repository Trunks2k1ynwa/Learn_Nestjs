import { Module, forwardRef } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { CommonService } from './common.service';

@Module({
  imports: [forwardRef(() => CatsModule)],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
