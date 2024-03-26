import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoggerMiddleware } from './common/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

   // Apply your custom middleware
   app.use(new LoggerMiddleware().use);
   await app.listen(3000);
  console.log("api Server started on the port 3000")
}
bootstrap();
