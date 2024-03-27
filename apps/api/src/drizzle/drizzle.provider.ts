import { PgDatabase } from "drizzle-orm/pg-core"
import * as schema from "./schema"
import { ConfigModule } from "@nestjs/config"
export const DrizzleAsyncProvider = 'drizzleProvider'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres = require('postgres')
import { migrate } from "drizzle-orm/postgres-js/migrator";

export const drizzleProvider = [
    {
        provide : DrizzleAsyncProvider,
        useFactory : async()=>
        {
            // const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL : ''
            // console.log(connectionString , "connectionString")
            // Disable prefetch as it is not supported for "Transaction" pool mode
             const client =  postgres("postgresql://postgres:QUFNHLx6wftWKvnh@db.ivzuwskcdkfojckdsgno.supabase.co:5432/postgres")
             const db =  drizzle(client , {schema});
             await migrate(db, { migrationsFolder: "drizzle" });
            return db;
        },
        inject : [],
        exports: [DrizzleAsyncProvider]
    }
]


//----------2nd for supabase
// import 'dotenv/config'

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

// const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL : ''

// // Disable prefetch as it is not supported for "Transaction" pool mode
// export const client = postgres(connectionString, { prepare: false })
// export const db = drizzle(client);