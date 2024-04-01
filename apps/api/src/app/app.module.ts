import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { PinoLogger } from '../common/pino.logger';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { NestDrizzleModule } from '@ockonor/nest-drizzle';
import * as schema from "../drizzle/schema"
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { UserSupabaseModule } from 'src/user-supabase/user-supabase.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    LoggerModule.forRoot(PinoLogger),
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile : join(process.cwd() , "src/graphql/schema.graphql"), //make types auto with decorators (codeFirstApproach)
      definitions :  {
        path : join(process.cwd() , "src/graphql/graphql.ts")
      },
      graphiql: true,
      // typePaths : ["./**/*.graphql"] //check all files in currentFolder with .graphql (SchemaFirst approach)
    }),
    DrizzleModule,
    SupabaseModule,
    UserModule,
    // AuthModule,
    UserSupabaseModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService , AppResolver ],
})
export class AppModule {}
