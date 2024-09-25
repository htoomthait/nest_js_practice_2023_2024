import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
    constructor(@InjectQueue('example-queue') private readonly queue: Queue) { }

    async addJob(data: any) {
        console.log('Adding job to queue:', data);
        await this.queue.add('example-job', data); // Job name and data
    }

    async addJob2(data: any) {
        console.log('Adding to the queue: ', data);
        await this.queue.add('example-job-2', data, { delay: 10, attempts: 1, backoff: 5000 });
    }
}
