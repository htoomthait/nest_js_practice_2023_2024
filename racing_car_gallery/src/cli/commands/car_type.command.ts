import { CommandRunner, Command } from 'nest-commander';

@Command({ name: 'car_type:list', description: 'Just to list car type' })
export class CarTypeCommand extends CommandRunner {
    async run(): Promise<void> {
        console.log('This is the car type list command!');
        // Add your logic here, like fetching data from a database
    }
}