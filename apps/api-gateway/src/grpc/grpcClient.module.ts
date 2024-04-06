import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GRPC_AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, './proto/auth.proto'),
        },
      },
      {
        name: 'GRPC_TASK_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'task',
          protoPath: join(__dirname, './proto/task.proto'),
        },
      },
    ]),
  ],
  exports: [ClientsModule], // Export the configured ClientsModule
})
export class GrpcClientModule {}