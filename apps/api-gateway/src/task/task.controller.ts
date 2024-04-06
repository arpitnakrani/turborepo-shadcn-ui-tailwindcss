import { Body, Controller, Delete, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { IAuthService } from 'src/interface/authService';
import { CreateTaskDto } from './dto/createtask.dto';
import { updateTaskDto } from './dto/updateTask.dto';
import { ITaskService } from 'src/interface/taskService';


@ApiTags('task')
@ApiBearerAuth('accesstoken')
@ApiBearerAuth('refreshtoken')
@Controller('task')
export class TaskController {
    private authService: any
    private taskService: any

    constructor(
      @Inject('GRPC_AUTH_SERVICE') private readonly GrpcAuthServiceClient : ClientGrpc,
      @Inject('GRPC_TASK_SERVICE') private readonly GrpcTaskServiceClient : ClientGrpc,

    ) {}

    onModuleInit() {
        try {
          this.authService = this.GrpcAuthServiceClient.getService<IAuthService>('AuthService');
          console.log("GrpcAuthServiceClient onModuleInit" , this.GrpcAuthServiceClient)
          console.log(this.authService , "this.authService");

          this.taskService = this.GrpcTaskServiceClient.getService<ITaskService>('TaskService');
          console.log("GrpcTaskServiceClient onModuleInit" , this.GrpcTaskServiceClient)
          console.log(this.taskService , "this.GrpcTaskServiceClient");
        }catch(err)
        {
          console.log(err)
        }
        
    }
  

    @Post('create')
    @ApiBody({
       type: CreateTaskDto,
       description: 'Json structure for user object',
    })
    async createTask(@Body() dto: CreateTaskDto , @Req() req : FastifyRequest) {
      return await this.taskService.createTask(dto , req);
    }
  
    @Post('update')
    @ApiBody({
       type: updateTaskDto,
       description: 'Json structure for user object',
    })
    async login(@Body() dto: updateTaskDto) {
      return await this.taskService.updateTask(dto);
    }

    @Get('all')
    async getAllTasks() {
        return await this.taskService.getAllTasks();
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number){
        return await this.taskService.deleteTask(id);
    }
}
