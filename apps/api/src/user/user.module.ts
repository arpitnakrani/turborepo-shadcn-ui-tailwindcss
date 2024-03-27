import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import {  drizzleProvider } from 'src/drizzle/drizzle.provider';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService ],
})
export class UserModule {}
