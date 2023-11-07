import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {init} from "./common/plugin-pino-logger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/services/pino');
  init(app);


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
