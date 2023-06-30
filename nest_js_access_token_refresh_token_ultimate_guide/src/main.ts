import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { join } from 'path';

async function bootstrap() {
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule, {
    logger: configService.get<LogLevel[]>('log.loggerLevel'),
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.RUNNING_PORT || 5000);

  const _configService = app.get(ConfigService);

  Logger.log(
    `Server running on http://localhost:${process.env.RUNNING_PORT}`,
    'Bootstrap',
  );

  Logger.log(
    `database url: ${_configService.get<string>('database.databaseURL')}`,
    'Bootstrap',
  );

  Logger.log(
    `database url from env file: ${process.env.DATABASE_URL}`,
    'Bootstrap',
  );

  /*#region ENV file update database url */
  const file = await fs.readFileSync(join(process.cwd(), '.env'), 'utf-8');
  const updateData = file.replace(
    /DATABASE_URL\b.*$/g,
    `DATABASE_URL=${_configService.get<string>('database.databaseURL')}`,
  );

  await fs.writeFileSync(join(process.cwd(), '.env'), updateData, 'utf-8');
  /*#endregion*/

  // This is timeout function to show the updated env file
  setTimeout(async () => {
    const file = await fs.readFileSync(join(process.cwd(), '.env'), 'utf-8');
    Logger.log(`dot env file path: ${join(process.cwd(), '.env')}`);
    Logger.log(`.env file: ${JSON.stringify(file)}`, 'Bootstrap');
  }, 1000);

  // check jwt secret key
  Logger.log(
    `jwt at secrect key : ${_configService.get<string>(
      'jwt.accessTokenSecret',
    )}`,
    'jwt key check',
  );
}

bootstrap();
