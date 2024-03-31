import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { SupabaseAsyncProvider } from './supabase.provider';

@Injectable()
export class SupabaseService {
    constructor(@Inject(SupabaseAsyncProvider) readonly supabase: SupabaseClient) {}

}
