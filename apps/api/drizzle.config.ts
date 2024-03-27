import type { Config } from "drizzle-kit";

export default {
    schema : './src/drizzle/schema.ts',
    out : './drizzle',
    driver : 'pg',
    dbCredentials :{
        connectionString : 'postgresql://postgres:QUFNHLx6wftWKvnh@db.ivzuwskcdkfojckdsgno.supabase.co:5432/postgres'
    }
} satisfies Config;