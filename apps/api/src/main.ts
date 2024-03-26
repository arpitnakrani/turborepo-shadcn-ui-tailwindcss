import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoggerMiddleware } from './common/logger.middleware';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
      const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
      );

      // Apply your custom middleware
      //  app.use(new LoggerMiddleware().use);

      //Apply pino logger
      app.useLogger(app.get(Logger));
      app.useGlobalInterceptors(new LoggerErrorInterceptor());

      await app.listen(3000);
      console.log("api Server started on the port 3000")
}
bootstrap();
