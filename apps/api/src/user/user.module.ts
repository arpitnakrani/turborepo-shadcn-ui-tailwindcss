import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import {  drizzleProvider } from 'src/drizzle/drizzle.provider';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService ,UserResolver],
})
export class UserModule {}
