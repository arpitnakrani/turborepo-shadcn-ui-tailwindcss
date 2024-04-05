import { ConfigModule } from "@nestjs/config"

import { createClient } from '@supabase/supabase-js'
export const SupabaseAsyncProvider = 'supabaseProvider'

export const supabaseProvider = [
    {
        provide : SupabaseAsyncProvider,
        useFactory : async()=>
        {
            const supabase = createClient("https://ivzuwskcdkfojckdsgno.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2enV3c2tjZGtmb2pja2RzZ25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNzczMzMsImV4cCI6MjAyNjg1MzMzM30.8vdgWOUEVAnmnSdZZykMBVQeUxqf3XuaElZR-7udzWo", {
                auth: {
                  autoRefreshToken: false,
                  persistSession: false,
                  detectSessionInUrl: false
                }
              })
            return supabase;
        },
        inject : [],
        exports: [SupabaseAsyncProvider]
    }
]
