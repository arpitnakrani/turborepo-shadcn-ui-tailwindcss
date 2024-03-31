import { ConfigModule } from "@nestjs/config"

import { createClient } from '@supabase/supabase-js'

export const SupabaseAsyncProvider = 'supabaseProvider'
export const supabaseProvider = [
    {
        provide : SupabaseAsyncProvider,
        useFactory : async()=>
        {
            const supabase = createClient(process.env.supabase_url!, process.env.anon_key!, {
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
