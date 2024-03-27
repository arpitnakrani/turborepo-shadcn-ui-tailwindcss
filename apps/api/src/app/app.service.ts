import { Inject, Injectable, Logger } from '@nestjs/common';
import { error } from 'console';
import * as schema from "../drizzle/schema"
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDb, DRIZZLE_ORM } from '@ockonor/nest-drizzle';

@Injectable()
export class AppService {
  constructor(@Inject(DrizzleAsyncProvider) private db : PostgresJsDatabase<typeof schema>){}
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    // this.logger.log(`Retrieve all AppService`);
    this.logger.error({ id: `retrieve-all-AppService-error` }, `Retrieve all AppService`) // object passed in first argument
    // throw new Error("fdfsdfdf")

    return 'Hello World!';
  }
}
