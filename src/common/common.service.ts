import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CatsService } from '../cats/cat.service';

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}
  protected common = [];
  testFuncton() {
    console.log('testFuncton', this.catsService.findAllCat());
  }
}
