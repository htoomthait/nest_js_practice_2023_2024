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
import * as process from 'process';

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
  }), PrismaModule,],
  controllers: [AppController, CarBranchController],
  providers: [AppService, CarBranchService, GenericApiResponseDto],
})
export class AppModule { }
