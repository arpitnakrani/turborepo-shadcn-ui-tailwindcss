import { PgDatabase } from "drizzle-orm/pg-core"
import * as schema from "./schema"
import { ConfigModule } from "@nestjs/config"
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres = require('postgres')
import { migrate } from "drizzle-orm/postgres-js/migrator";

export const DrizzleAsyncProvider = 'drizzleProvider'
export const drizzleProvider = [
    {
        provide : DrizzleAsyncProvider,
        useFactory : async()=>
        {
            const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL : ''
            console.log(connectionString , "connectionString")
            // Disable prefetch as it is not supported for "Transaction" pool mode
             const client =  postgres(connectionString)
             const db =  drizzle(client , {schema});
             await migrate(db, { migrationsFolder: "drizzle" });
            return db;
        },
        inject : [],
        exports: [DrizzleAsyncProvider]
    }
]
