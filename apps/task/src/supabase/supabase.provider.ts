import { ConfigModule } from "@nestjs/config"

import { createClient } from '@supabase/supabase-js'
export const SupabaseAsyncProvider = 'supabaseProvider'

export const supabaseProvider = [
    {
        provide : SupabaseAsyncProvider,
        useFactory : async()=>
        {
            const supabase = createClient("https://xxfhvuarkdruvonrnrvy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2enV3c2tjZGtmb2pja2RzZ25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNzczMzMsImV4cCI6MjAyNjg1MzMzM30.8vdgWOUEVAnmnSdZZykMBVQeUxqf3XuaElZR-7udzWo", {
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

//password for db :- hEkMfXFGiQbE2uJA
//jwt secret :- BIZpKsrt9xG4VM+MvoMyWnU1C7wWpFYWOO8z8JM8hqoDc9BjZ0hqUI3uv5ZJ67EmPN0GRliBem/obIJv9lgZyw==