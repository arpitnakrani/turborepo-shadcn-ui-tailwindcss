import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService , private readonly drizzleService : DrizzleService) {}
  private db  = this.drizzleService.db

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
}
