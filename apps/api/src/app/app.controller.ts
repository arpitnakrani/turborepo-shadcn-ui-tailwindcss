import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
}
