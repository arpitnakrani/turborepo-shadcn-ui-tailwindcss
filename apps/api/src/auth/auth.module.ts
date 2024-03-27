import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService , ...drizzleProvider],
})
export class AuthModule {}
