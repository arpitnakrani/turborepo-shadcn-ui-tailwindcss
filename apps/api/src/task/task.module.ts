import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TaskService , JwtService],
  controllers: [TaskController]
})
export class TaskModule {}
