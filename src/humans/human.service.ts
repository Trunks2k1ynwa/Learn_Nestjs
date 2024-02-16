import { Injectable } from '@nestjs/common';
import { Humans } from 'src/humans/interfaces/human.interface';

@Injectable()
export class HumansService {
  protected readonly humans: Humans[] = [];

  createHuman(human: Humans) {
    this.humans.push(human);
  }

  findAllHuman(): Humans[] {
    return this.humans;
  }
}
