import { Injectable  , ConflictException} from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTaskDto } from './dto/createtask.dto';
import { updateTaskDto } from './dto/updateTask.dto';


@Injectable()
export class TaskService {
  constructor(private readonly supabaseService : SupabaseService){}
  // private db  = this.drizzleService.db
  private  supabase :SupabaseClient= this.supabaseService.supabase

  async createTask (dto: CreateTaskDto) {
      // console.log(req?.supabaseService , "req" , req?.supabaseService?.supabase )
      // console.log("------------------------------------------------------------------------------------------------------------------------")
      // console.log(this?.supabaseService , "supabase2" , this.supabase)

      try {

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

  async inviteUserToTask (payload) {
    try {
        const { data, error } = await this.supabase
            .from('tasks')
            .delete()
            .match({ id: payload.id });

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
