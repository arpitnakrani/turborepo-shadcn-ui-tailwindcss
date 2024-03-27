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

@Module({
  imports: [
    // NestDrizzleModule.registerAsync({
    //   useFactory: () => {
    //     return {
    //       driver: 'postgres-js', // 'postgres-js'|'mysql2'|'supabase'|'neon'|'planetscale' |'sqlite3'
    //       url: 'postgresql://postgres:QUFNHLx6wftWKvnh@db.ivzuwskcdkfojckdsgno.supabase.co:5432/postgres', // postgres://<user>:<password>@<host>:<port>/<database>, ./<your file>.sqlite
    //       option: { schema },
    //       migrationOption: { migrationsFolder: '././drizzle' },
    //       };
    //   }
    // }),
    LoggerModule.forRoot(PinoLogger),
    ConfigModule.forRoot({isGlobal: true}),
    DrizzleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
