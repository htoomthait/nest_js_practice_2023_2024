import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as moment from 'moment';

@Processor('example-queue') // Queue name should match the one in the module
export class QueueProcessor {
    @Process({
        name: 'example-job',
        concurrency: 5
    }) // Job name
    async handleExampleJob(job: Job<any>) {
        console.log('Processing job with data:', job.data);

        // Simulate some processing
        const result = await this.someTask(job.data);

        console.log('Job completed with result:', result);
        return result;
    }

    private async someTask(data: any) {
        // Simulate a task taking some time
        return new Promise((resolve) => setTimeout(() => resolve(data), 10000));
    }

    @Process('example-job-2')
    async handleExampleJob2(job: Job<any>) {

        const now = moment().toISOString();
        console.log(now, 'process job with data : ', job.data);


        const result = await this.someTask2(job.data);

        const now2 = moment().toISOString();



        console.log(now2, 'Job completed with result ');
        console.log(result);

        return result;
    }

    private async someTask2(id: number) {
        try {
            // await this.sleep(50);
            // console.log(id);

            // const resp = await fetch(`https://reqres.in/api/products/${id}`);
            // const data = await resp.json();
            // console.log(resp.status)

            return id;


        } catch (error) {
            // console.log(error);
            // return error;
        }


    }

    // Sleep function that returns a promise
    private sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}