import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true,
      envFilePath: [
        '.env',
        '.env.development.local',
        '.env.development.staging',
        '.env.development.testing',
        '.env.production',
      ],
      load: [database],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
