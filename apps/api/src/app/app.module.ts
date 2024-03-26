import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { PinoLogger } from '../common/pino.logger';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    LoggerModule.forRoot(PinoLogger),
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService , PrismaService],
})
export class AppModule {}
