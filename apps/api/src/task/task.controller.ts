import { Body, Controller, Delete, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { CreateTaskDto } from './dto/createtask.dto';
import { TaskService } from './task.service';
import { updateTaskDto } from './dto/updateTask.dto';
import { supabaseJwtGuard } from 'src/auth/guards/supabase.guard';
import { FastifyRequest } from 'fastify';

@ApiTags('task')
@UseGuards(supabaseJwtGuard)
@ApiBearerAuth('accesstoken')
@ApiBearerAuth('refreshtoken')
@Controller('task')
export class TaskController {

    constructor(private readonly taskService : TaskService){}

      @Post('create')
      @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
      @ApiResponse({ status: 403, description: 'Forbidden.'})
      @ApiBody({
         type: CreateTaskDto,
         description: 'Json structure for user object',
      })
      async createTask(@Body() dto: CreateTaskDto , @Req() req : FastifyRequest) {
        return await this.taskService.createTask(dto , req);
      }
    
      @Post('update')
      @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
      @ApiResponse({ status: 403, description: 'Forbidden.'})
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
