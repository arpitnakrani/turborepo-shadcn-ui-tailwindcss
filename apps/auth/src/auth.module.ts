import { Module } from '@nestjs/common';
import {  AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SupabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
