import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoggerMiddleware } from './common/logger.middleware';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
      const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
      );

      //Apply your custom middleware
      // app.use(new LoggerMiddleware().use);

      //Apply pino logger
      app.useLogger(app.get(Logger));
      app.useGlobalInterceptors(new LoggerErrorInterceptor());

      //Swagger
      const options = new DocumentBuilder()
      .setTitle('NESTJS APPLICATION')
      .setDescription('API description')
      .setVersion('1.0')
      .addServer('http://localhost:3000/', 'Local environment')
      .addServer('https://staging.yourapi.com/', 'Staging')
      .addServer('https://production.yourapi.com/', 'Production')
      .addTag('Your API Tag')
      .build();

      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api-docs', app, document);

      await app.listen(3000);
      console.log("api Server started on the port 3000")
}
bootstrap();
