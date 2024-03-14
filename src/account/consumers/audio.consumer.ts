import { Process, Processor } from '@nestjs/bull';
import { Scope } from '@nestjs/common';
import { Job } from 'bull';

@Processor({ name: 'test-queue', scope: Scope.REQUEST })
export class AudioConsumer {
  handleData(job: Job<unknown>) {
    console.log(job.name);
  }
  @Process('register')
  async handleQueue(job: Job<unknown>) {
    let progress = 0;
    this.handleData(job);
    for (let i = 0; i < 100; i++) {
      progress += 1;
      await job.progress(progress);
    }
    return 'successfully';
  }
}
