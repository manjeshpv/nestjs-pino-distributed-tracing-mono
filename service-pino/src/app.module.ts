import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinoModule } from './common/plugin-pino-logger';
import { Sentry } from './common/plugin-sentry';
import '@sentry/tracing'

const prodImports = [];
if (process.env.NODE_ENV !== 'development') {
  prodImports.push(PinoModule);
}
@Module({
  imports: [...prodImports],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    console.log('AppModule.configure()');
    // enableMiddleware(consumer);
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
