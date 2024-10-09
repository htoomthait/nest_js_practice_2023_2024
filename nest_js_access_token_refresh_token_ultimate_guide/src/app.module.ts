import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import database from './config/database.config';
import jwt from './config/jwt.config';
import log from './config/log.config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        '.env',
        '.env.development.local',
        '.env.development.staging',
        '.env.development.testing',
        '.env.production',
      ],
      load: [database, jwt, log],
    }),
    AuthModule,
    PrismaModule,
    QuizModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
