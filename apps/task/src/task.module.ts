import { Module } from '@nestjs/common';
import {  TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SupabaseModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
