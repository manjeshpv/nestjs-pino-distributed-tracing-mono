import { ArgumentsHost, Catch, HttpServer } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { Sentry } from './plugin-sentry';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  handleUnknownError(
    exception: any,
    host: ArgumentsHost,
    applicationRef: HttpServer<any, any> | AbstractHttpAdapter<any, any, any>,
  ): void {
    console.log('handleUnknownError()', exception);
    Sentry.captureException(exception);
    super.handleUnknownError(exception, host, applicationRef);
  }
}
