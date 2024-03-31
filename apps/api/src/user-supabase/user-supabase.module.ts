import { Module } from '@nestjs/common';
import { UserSupabaseService } from './user-supabase.service';
import { UserSupabaseController } from './user-supabase.controller';

@Module({
  controllers: [UserSupabaseController],
  providers: [UserSupabaseService],
})
export class UserSupabaseModule {}
