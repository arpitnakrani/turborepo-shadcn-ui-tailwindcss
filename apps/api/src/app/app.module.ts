import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { PinoLogger } from '../common/pino.logger';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { GraphQLModule } from '@nestjs/graphql';
import {  MercuriusDriverConfig } from '@nestjs/mercurius';
import { AppResolver } from './app.resolver';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { UserSupabaseModule } from 'src/user-supabase/user-supabase.module';
import { TaskModule } from 'src/task/task.module';
import { MemphisModule } from 'src/memphis/memphis.module';
import { graphqlConfig } from 'src/graphql/graphql.config';

@Module({
  imports: [
    LoggerModule.forRoot(PinoLogger),
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<MercuriusDriverConfig>(graphqlConfig),
    DrizzleModule,
    SupabaseModule,
    UserModule,
    // AuthModule,
    UserSupabaseModule,
    TaskModule,
    MemphisModule
  ],
  controllers: [AppController],
  providers: [AppService , AppResolver ],
})
export class AppModule {}
