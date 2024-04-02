import { Controller, Get, Post, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService ) {}

  @Get()
  @Version('2')
  getHello(): string {
    return this.appService.getHello();
  }
  
}
