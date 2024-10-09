import { Injectable } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';

@Injectable()
@Command({ name: 'greet', description: 'A simple greeting command' })
export class GreetCommand extends CommandRunner {
    async run(passedParam: string[], options?: Record<string, any>): Promise<void> {
        const name = options?.name || 'World'; // Default to 'World' if no name is passed
        console.log(`Hello, ${name}!`);
    }

    @Option({
        flags: '-n, --name [name]',
        description: 'Provide a name to greet',
    })
    parseName(val: string): string {
        return val;
    }
}