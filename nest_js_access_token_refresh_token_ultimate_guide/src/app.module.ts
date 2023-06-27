import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
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
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
