
import * as Sentry from '@sentry/node';
import '@sentry/tracing';

Sentry.init({
  dsn: 'https://6feafe1b3e5e4f669369319dcfc8326f@o4505339874508800.ingest.sentry.io/4506173607968768',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    // new Sentry.Integrations.Express({ app }),
    // new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  // profilesSampleRate: 1.0,
});


Sentry.captureException(new Error('XXX  pino service restarted'))
export { Sentry };
// export function enableMiddleware(consumer) {
//   consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
//     path: '*',
//     method: RequestMethod.ALL,
//   });
// }

// export function enableExceptionFilter(app) {
//   console.log('plugin-sentry.enableExceptionFilter()');
//
// }
