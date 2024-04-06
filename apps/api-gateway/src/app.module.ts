import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { AppProviders } from './app.provider';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import { GrpcClientModule } from './grpc/grpcClient.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    GrpcClientModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService], //...AppProviders  
})
export class AppModule {}
