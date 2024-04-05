import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { FastifyRequest } from 'fastify/types/request';
import { SupabaseService } from 'src/supabase/supabase.service';
  
  @Injectable()
  export class supabaseJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService , private supabaseService: SupabaseService) {}
    private  supabase :SupabaseClient= this.supabaseService.supabase

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const accessToken = this.extractTokenFromHeader(request , "accesstoken");
      const refreshToken = this.extractTokenFromHeader(request , "refreshtoken");

    //   console.log(accessToken , "accessToken")
    //   console.log(refreshToken , "refreshToken")
  
    //   if (!(accessToken && refreshToken)) throw new UnauthorizedException();
  
      try {
        // const payload = await this.jwtService.verifyAsync(token, {
        //   secret: process.env.jwtSecretKey,
        // });
        // request['user'] = payload;

        //attaching supabase service isntqance with session
        // let refreshToken = "hcxeWknznHpUdK-u5_rieg";
        // let accessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6InJ4VHQyU2xrMlJOTWQvZUEiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzExOTA5MjAwLCJpYXQiOjE3MTE5MDU2MDAsImlzcyI6Imh0dHBzOi8vaXZ6dXdza2Nka2ZvamNrZHNnbm8uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImViMmJmOGVjLTRmMTYtNGYzMy1iMzM3LWViNTg0MjBlNDYzYyIsImVtYWlsIjoiYXJwaXRhZG1pbkB5b3BtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJhcnBpdGFkbWluQHlvcG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImViMmJmOGVjLTRmMTYtNGYzMy1iMzM3LWViNTg0MjBlNDYzYyJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzExOTA1NjAwfV0sInNlc3Npb25faWQiOiI2OTY0MjIxMi1kODgwLTQ0OGEtOWE4Yy00NGFkZjVlNWQ1MDAiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.n2mcFAHwDEBdKYVO2pJqQwWgCngJzfWX0TWNfqkMi1Y";


        if (refreshToken && accessToken) {
            await this.supabase.auth.setSession({
              refresh_token: refreshToken,
              access_token: accessToken,
            //   {
            //     auth: { persistSession: false },
            //   }
            })
          } 

        // Pass the modified supabaseService instance to other services
      request['supabaseService'] = this.supabaseService;
      } catch(err) {
        console.log(err)
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: FastifyRequest, key: string) {

        // console.log(request.headers , "headers")
        const headerValue = request.headers[key];
        if (headerValue && typeof headerValue === 'string') {
            // const token = headerValue.split(' ')[1];
            return headerValue;
        }
        return undefined;
    }
  }
  