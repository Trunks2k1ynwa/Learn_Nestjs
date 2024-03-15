import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor({ name: 'test-queue' })
export class AudioConsumer {
  // constructor(@Inject(JOB_REF) private jobRef: Job) {}
  @Process('register')
  async handleQueue(job: Job<unknown>) {
    console.log('handleQueue');
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      progress += 1;
      await job.progress(progress);
    }
    return {
      name: job.name,
      // data: this.jobRef.data.data,
    };
  }
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data.data}...`,
    );
  }
}
