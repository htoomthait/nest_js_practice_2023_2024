import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { config } from 'rxjs';
import { readFile } from 'fs/promises';
import { writeFile, writeFileSync } from 'fs';
import { CommandFactory } from 'nest-commander';
import { CustomValidationExceptionFilter } from './utility/custom-validation-exception-filter';

async function bootstrap() {
  dotenv.config(); // Loads .env file

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new CustomValidationExceptionFilter());


  const configureService = new ConfigService();
  const logger = new Logger("Main File");



  const appRunningPort = configureService.get<number>('PORT');
  const dbURL = configureService.get<string>('DATABASE_URL');

  logger.verbose(`Running port ${appRunningPort}`);
  // logger.verbose(`DB URL : ${dbURL}`);




  // logger.debug(process.env.DB_HOST);


  const dbProvider = process.env.DB_PROVIDER
  const dbHost = process.env.DB_HOST
  const dbName = process.env.DB_NAME
  const dbPort = process.env.DB_PORT
  const dbUsername = process.env.DB_USERNAME
  const dbPassword = process.env.DB_PASSWORD

  const databaseUrl = `${dbProvider}://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`; // db url concat
  const dotEnvFilePath = configureService.get<string>('DOT_ENV_FILE_PATH');

  // logger.debug(databaseUrl);
  const dotEnvFileData = await readFile(dotEnvFilePath, 'utf-8');
  // logger.debug(dotEnvFileData);

  const updatedEnvFileData = dotEnvFileData.replace(`DATABASE_URL=""`, `DATABASE_URL="${databaseUrl}"`);

  writeFileSync(dotEnvFilePath, updatedEnvFileData, 'utf-8');
  writeFileSync(".env", updatedEnvFileData, 'utf-8'); // for prisma









  await app.listen(appRunningPort);
  // await CommandFactory.run(AppModule, ['log', 'warn', 'error', 'debug', 'verbose']);





}
bootstrap();
