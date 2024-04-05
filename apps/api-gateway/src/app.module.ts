import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { AppProviders } from './app.provider';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ClientsModule.register([
      {
        name: 'GRPC_AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, './auth/auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService ], //...AppProviders
  
})
export class AppModule {}
