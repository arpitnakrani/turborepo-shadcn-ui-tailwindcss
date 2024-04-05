require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions, GrpcOptions, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as path from 'path';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const PORT = '3003'  //process.env.authService.port || config.get(authService).port

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      host: 'localhost',
      port: PORT,
      package: 'auth',
      protoPath: path.join(__dirname, 'auth/auth.proto'),
      loaders: {
        enums: String,
        objects: true,
        arrays: true,
      },
    },
  } as GrpcOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //only allow req if it meets dto parameters
      forbidNonWhitelisted: true, //not allow req if body contains extra keys then mentioned in dto
      transform: true,//transform the body items to as per dto(ex.string to number)
    }),
  );

  await app.listen();
  console.log(`GRPC:AuthService started on port:${PORT}`)
}
bootstrap();
