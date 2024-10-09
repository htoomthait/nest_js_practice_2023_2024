import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'example-queue',
      limiter: {
        max: 3,        // Maximum number of jobs that can be processed
        duration: 1000 // Time window in milliseconds (1 second)
      }
    })
  ],

  providers: [QueueService, QueueProcessor],
  exports: [QueueService]
})
export class QueueModule { }
