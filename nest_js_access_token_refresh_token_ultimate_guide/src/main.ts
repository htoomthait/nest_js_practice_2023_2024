import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.RUNNING_PORT || 5000);

  const configService = app.get(ConfigService);

  Logger.log(
    `Server running on http://localhost:${process.env.RUNNING_PORT}`,
    'Bootstrap',
  );

  Logger.log(
    `database url: ${configService.get<string>('database.databaseURL')}`,
    'Bootstrap',
  );

  Logger.log(
    `database url from env file: ${process.env.DATABASE_URL}`,
    'Bootstrap',
  );

  /*#region ENV file update database url */
  const file = await fs.readFileSync(join(process.cwd(), '.env'), 'utf-8');
  const updateData = file.replace(
    /DATABASE_URL=\b.*$/g,
    `DATABASE_URL=${configService.get<string>('database.databaseURL')}`,
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
