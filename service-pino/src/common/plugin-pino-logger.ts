import { Logger } from 'nestjs-pino';

process.env.NODE_ENV = 'production';
export function init(app) {
  //Ovverides default nest js logger if env != development
  if (process.env.NODE_ENV !== 'development') {
    const pinoLogger = app.get(Logger);
    app.useLogger(pinoLogger);
  }
}

import { LoggerModule } from 'nestjs-pino';
import arrayContaining = jasmine.arrayContaining;

//If env === development, uses nest js default logger
//Else, pino logger overrides the default logger

const { name: serviceName } = require('../../package.json');

const PinoModule = LoggerModule.forRoot({
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
});

export { PinoModule };
