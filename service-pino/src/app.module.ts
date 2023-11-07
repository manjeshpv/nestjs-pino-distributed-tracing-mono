import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

const array = [];

//If env === development, uses nest js default logger
//Else, pino logger overrides the default logger

const { name: serviceName } = require('../package.json');

if (process.env.NODE_ENV !== 'development') {
  array.push(
    LoggerModule.forRoot({
      pinoHttp: {
        base: {
          service: serviceName,
        },
        messageKey: 'message',
        customLogLevel: (res, err) => {
          if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
          if (res.statusCode >= 500 || err) return 'error';
          return 'info';
        },

        //Logging output format
        serializers: {
          req: (req) => {
            return {
              trace_id: req.headers['x-trace-id'] || 'no-trace-id-from-gtw',
            };
          },
        },
        autoLogging: false,
      },
    }),
  );
}
@Module({
  imports: array,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
