import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './dbservice/database.module';
import { ReceptionistModule } from './receptionist/receptionist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    ReceptionistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}