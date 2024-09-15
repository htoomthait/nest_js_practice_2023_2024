import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarTypeCommand } from './commands/car_type.command';
import { GreetCommand } from './commands/greet.command';


@Module({
    imports: [PrismaModule],
    providers: [GreetCommand]
})
export class CliModule { }
