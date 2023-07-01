import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  await app.listen(process.env.APP_RUNNING_PORT || 5000);

  const _configService = app.get(ConfigService);

  Logger.log(`Application Name : ${process.env.APP_NAME}`, 'Bootstrap');

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
}
bootstrap();
