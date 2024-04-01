import { FastifyRequest } from 'fastify';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateUserDto } from 'src/user/dto/user.dto';

declare module 'fastify' {
  interface FastifyRequest {
    user?: CreateUserDto; // Define the user property
    supabaseService?: SupabaseService
  }
}