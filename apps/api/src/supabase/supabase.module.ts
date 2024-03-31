import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { supabaseProvider } from './supabase.provider';

@Global()
@Module({
  providers: [SupabaseService, ...supabaseProvider],
  exports: [SupabaseService]
})
export class SupabaseModule {}
