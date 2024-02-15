import { Injectable } from '@nestjs/common';
import { Humans } from 'src/interfaces/human.interface';

@Injectable()
export class HumansService {
  protected readonly humans: Humans[] = [];

  createHuman(cat: Humans) {
    this.humans.push(cat);
  }

  findAllHuman(): Humans[] {
    return this.humans;
  }
}
