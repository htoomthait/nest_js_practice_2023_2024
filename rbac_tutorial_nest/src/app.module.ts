import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import database from './config/database.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeDataModule } from './employee-data/employee-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      load: [database],
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    EmployeeDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
