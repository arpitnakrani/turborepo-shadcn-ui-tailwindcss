import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'signUp')
  public async signup(data){
    return await this.authService.create(data);
  }

  @GrpcMethod('AuthService', 'login')
  public async login(data){
    return await this.authService.login(data);
  }

  @GrpcMethod('AuthService', 'getAllUsers')
  public async getAllUsers(){
    return await this.authService.getAllUsers();
  }

}

