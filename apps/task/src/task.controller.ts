import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService', 'createTask')
  public async createTask(data){
    return await this.taskService.createTask(data);
  }

  @GrpcMethod('TaskService', 'updateTask')
  public async updateTask(data){
    return await this.taskService.updateTask(data);
  }

  @GrpcMethod('TaskService', 'inviteUserToTask')
  public async getAllUsers(data){
    return await this.taskService.inviteUserToTask(data);
  }


  @GrpcMethod('TaskService', 'deleteTask')
  public async deleteTask(data){
    return await this.taskService.deleteTask(data);
  }


  @GrpcMethod('TaskService', 'getAllTask')
  public async getAllTask(){
    return await this.taskService.getAllTasks();
  }

}

