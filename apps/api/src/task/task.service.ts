import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateTaskDto } from './dto/createtask.dto';
import { updateTaskDto } from './dto/updateTask.dto';
import { FastifyRequest } from 'fastify';

@Injectable()
export class TaskService {
    constructor(private readonly supabaseService : SupabaseService){}
    // private db  = this.drizzleService.db
    private  supabase :SupabaseClient= this.supabaseService.supabase

    async createTask (dto: CreateTaskDto , req : FastifyRequest) {
        // console.log(req?.supabaseService , "req" , req?.supabaseService?.supabase )
        // console.log("------------------------------------------------------------------------------------------------------------------------")
        // console.log(this?.supabaseService , "supabase2" , this.supabase)

        try {
            //attaching supabase service isntqance with session
        // let refreshToken = "yp1U5t1WRFeHFWoQlVbbJg";
        // let accessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6InJ4VHQyU2xrMlJOTWQvZUEiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzExOTAzNjExLCJpYXQiOjE3MTE5MDAwMTEsImlzcyI6Imh0dHBzOi8vaXZ6dXdza2Nka2ZvamNrZHNnbm8uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImYzY2M3NzgwLTk0YmEtNDEzZC04YTc1LTc0NjE4MDgyMmYxNyIsImVtYWlsIjoiYXJwaXQ4QHlvcG1haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImFycGl0OEB5b3BtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJmM2NjNzc4MC05NGJhLTQxM2QtOGE3NS03NDYxODA4MjJmMTcifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMTkwMDAxMX1dLCJzZXNzaW9uX2lkIjoiOTJiNDU3ZTQtZjJlNC00YWUyLThkZTEtNzM1YWExYjUzOTVhIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.mKAS4r0qcsEulAHuOXFLVQVbktbA04CGWJQTpcR1QQw";
        // if (refreshToken && accessToken) {
        //     await this.supabase.auth.setSession({
        //       refresh_token: refreshToken,
        //       access_token: accessToken,
        //     //   {
        //     //     auth: { persistSession: false },
        //     //   }
        //     })
        //   } 


        //   req.supabaseService!.
            const { data, error } = await this.supabase
                .from('tasks')
                .insert(dto)
                .select();
    
            if (error) {
                throw new Error(error.message);
            }
    
            return data;
        }catch(err)
        {
          console.log(err)
          return err
        }
    }

    async getAllTasks () {
        try {
            const { data, error } = await this.supabase
                .from('tasks')
                .select('*');
    
            if (error) {
                throw new Error(error.message);
            }
    
            return data;
        } catch(err)
        {
          console.log(err)
          return err
        }
    }

    async updateTask (dto: updateTaskDto) {
        try {
            const { data, error } = await this.supabase
                .from('tasks')
                .update(dto)
                .match({ id: dto.id });
    
            if (error) {
                throw new Error(error.message);
            }
    
            return data;
        } catch(err)
        {
          console.log(err)
          return err
        }
    }

    async deleteTask (id: number) {
        try {
            const { data, error } = await this.supabase
                .from('tasks')
                .delete()
                .match({ id: id });
    
            if (error) {
                throw new Error(error.message);
            }
    
            return data;
        }catch(err)
        {
          console.log(err)
          return err
        }
    }


}


