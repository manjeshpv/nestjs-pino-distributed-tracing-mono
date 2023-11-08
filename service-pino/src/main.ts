import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { init } from './common/plugin-pino-logger';
// import {enableExceptionFilter} from "./common/plugin-sentry";
import { Sentry } from './common/plugin-sentry';
import { SentryFilter } from './common/sentry.filter';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // init(app);
  // app.setGlobalPrefix('/services/pino');

  Sentry.captureException(new Error('L14x'))
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));


  // app.useLogger(app.get(PinoLogger));
  //This creates a new instance of DocumentBuilder, which is used to define
  // the metadata for API documentation.
  const config = new DocumentBuilder()
    .setTitle('pino service API  Docs ')
    .setVersion('1.0')
    .build();

  //This creates a Swagger document based on the
  //provided configuration and the Nest.js application (app)
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory(controllerKey, method) {
      return method;
    },
  });
  //sets up Swagger for our application.
  SwaggerModule.setup('services/pino/api/docs', app, document);

  await app.listen(3001);
  console.log('http://localhost:3001/services/pino/api/docs');
}
bootstrap();
