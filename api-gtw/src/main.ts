import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { requestLoggerMiddleware } from './request-logger.middleware';
import { OpenAPI } from './platform-sdk/pino';

OpenAPI.BASE = 'http://localhost:3001';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
