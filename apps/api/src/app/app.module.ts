import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { PinoLogger } from '../common/pino.logger';

@Module({
  imports: [
    LoggerModule.forRoot(PinoLogger),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
