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
        customLogLevel: (res, err) => {
          if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
          if (res.statusCode >= 500 || err) return 'error';
          return 'info';
        },

        //Logging output format
        serializers: {
          req: (req) => {
            return {
              //Unique request id (that was generated in the apigtw) is set in
              // the request headers
              //we are fetching it from headers and setting it as trace id
              //which will help us track the request as it propagates forward
              trace_id: req.headers['x-trace-id'],
              date: new Date(),
              service_name: serviceName,
            };
          },
        },
        //Automatic pino logging of incoming http requests turned off
        autoLogging: false,

        //Because we want the output to be written in json format to the log file,
        //pino pretty has been turned off

        // transport: {
        //   target: 'pino-pretty',
        // },
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
