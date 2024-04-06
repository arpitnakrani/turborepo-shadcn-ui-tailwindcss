import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { GrpcClientModule } from 'src/grpc/grpcClient.module';

@Module({
  imports:[GrpcClientModule],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
