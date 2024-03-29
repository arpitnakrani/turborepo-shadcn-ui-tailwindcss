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
@Module({
  imports: [
    LoggerModule.forRoot(PinoLogger),
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
    }),
    DrizzleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
