import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './auth/signup.dto';
import { LoginDto } from './auth/login.dto';
interface AuthService {
  signUp(data : any): Promise<any>;
  login(data : any): Promise<any>;
}
@ApiTags('Auth')
@Controller()
export class AppController {
  private authService: any
  constructor(
    @Inject('GRPC_AUTH_SERVICE') private readonly GrpcAuthServiceClient : ClientGrpc,
    private readonly appService: AppService,
  ) {}


  onModuleInit() {
    try {
      this.authService = this.GrpcAuthServiceClient.getService<AuthService>('AuthService');
      console.log("GrpcAuthServiceClient onModuleInit" , this.GrpcAuthServiceClient)
      console.log(this.authService , "this.authService");
    }catch(err)
    {
      console.log(err)
    }
    
  }

  @Post('signup')
  async userSignup(@Body() dto: SignupDto) {
    try {
      console.log(this.authService , "this.authService")
      return await this.authService.signUp(dto)
    }catch(err)
    {
        console.log(err ,"errr_in_signup")
        return err
    }
    
  }

  @Post('login')
  async userLogin(@Body() dto : LoginDto) {
    return await this.authService.login(dto)
  }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
