import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from './drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from "./schema"

@Injectable()
export class DrizzleService {
    constructor(@Inject(DrizzleAsyncProvider) readonly db: PostgresJsDatabase<typeof schema>) {}
}
