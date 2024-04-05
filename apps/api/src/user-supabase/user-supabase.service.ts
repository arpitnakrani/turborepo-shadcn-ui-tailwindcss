import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-supabase.dto';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import * as schema from "../drizzle/schema"
import { SupabaseService } from 'src/supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { LoginDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserSupabaseService {
    constructor(private readonly supabaseService : SupabaseService){}
    // private db  = this.drizzleService.db
    private  supabase :SupabaseClient= this.supabaseService.supabase

    async create(dto: CreateUserDto) {
          try {

            const existingUser= await this.supabase
              .from('users')
              .select('email')
              .eq('email', dto.email);

              console.log(existingUser , "existingUser")
            if(existingUser?.data?.length) throw new ConflictException('email duplicated');

            const { data, error } = await this.supabase.auth.signUp({
              email: dto.email,
              password: dto.password,
              options: {data : dto}
            })
      
            if(error) return error;
      
            const usersData = await this.supabase.from('users').insert([
              {
                ...dto,
                user_id : data?.user?.id  //uuid
              }
            ]);
              
            return data;

          }catch(err)
          {
            console.log(err)
            return err
          }
    }
      
  
    async login(dto: LoginDto) {
    
        console.log(dto , "dto")
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email:  dto.username,
            password: dto.password,
          })

          console.log(data , "data")
          console.log(error , "error");


          return data
   
      }

    // async findByEmail(email: string) {
    //   console.log(this.db , "dbCOnnection-------------------------------------------")
    //   return await this.db.query.users.findFirst({
    //     where: eq(schema.users.email , email)
    //   });
    // }
    async getAllUsers() {

        let refreshToken = "1ieatxssSYFZP38ED8ukig";
        let accessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6InJ4VHQyU2xrMlJOTWQvZUEiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzExODA1MTc2LCJpYXQiOjE3MTE4MDE1NzYsImlzcyI6Imh0dHBzOi8vaXZ6dXdza2Nka2ZvamNrZHNnbm8uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjM3NTA2YzM0LTVhN2MtNDIxMy1iZmQzLWQ4ZTJhYzI1Yzg3MCIsImVtYWlsIjoiYXJwaXQxQHlvcG1haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImFycGl0MUB5b3BtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiIzNzUwNmMzNC01YTdjLTQyMTMtYmZkMy1kOGUyYWMyNWM4NzAifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMTgwMTU3Nn1dLCJzZXNzaW9uX2lkIjoiYTFjMjQ3NTQtNzVkNS00MjJlLTk3ODktMTE1MmQ0ZmE2ZGI4IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.02fwDPoO7YcHjOOxRBDavX1EiFvqzu9PigqJIYFSYno";
        if (refreshToken && accessToken) {
            await this.supabase.auth.setSession({
              refresh_token: refreshToken,
              access_token: accessToken,
            //   {
            //     auth: { persistSession: false },
            //   }
            })
          }         
           const { data, error } = await this.supabase.from('users').select()
    return data;
    }
}
