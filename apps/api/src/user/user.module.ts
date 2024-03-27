import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import {  drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService , ...drizzleProvider],
})
export class UserModule {}
