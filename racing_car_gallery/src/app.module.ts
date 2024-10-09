import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacingCarModule } from './racing_car/racing_car.module';
import { CarTypeModule } from './car_type/car_type.module';
import { CarBrandModule } from './car_brand/car_brand.module';
import { CarBranchService } from './car_branch/car_branch.service';
import { CarBranchController } from './car_branch/car_branch.controller';
import { GenericApiResponseDto } from './dto/generic_api_response.dto';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CliModule } from './cli/cli.module';
import * as process from 'process';
import { GreetCommand } from './cli/commands/greet.command';
import { UtilityModule } from './utility/utility.module';
import { QueueModule } from './queue/queue.module';
import { BullModule } from '@nestjs/bull';

const getEnvFilePath = () => {
  const logger = new Logger("App Module");
  const env = process.env.NODE_ENV || 'development';
  logger.debug(env);
  logger.debug(process.env.NODE_ENV);

  const envFilePath = `env/.env.${env}`;
  logger.debug(envFilePath);
  return `.env.${env}`;
}


@Module({
  imports: [RacingCarModule, CarTypeModule, CarBrandModule, ConfigModule.forRoot({
    isGlobal: true, // Make the configuration global, available across the entire application
    envFilePath: getEnvFilePath(), // Load the appropriate .env file based on the environment
  }), PrismaModule, UtilityModule, BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
    QueueModule
  ],
  controllers: [AppController, CarBranchController],
  providers: [AppService, CarBranchService, GenericApiResponseDto, GreetCommand],
})
export class AppModule { }
