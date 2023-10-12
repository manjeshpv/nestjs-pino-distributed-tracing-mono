import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';
import { OpenAPI } from './platform-sdk/pino';

@Module({
  imports: [
    HttpModule,
    ClsModule.forRoot({
      middleware: {
        // automatically mount the
        // ClsMiddleware for all routes
        mount: true,
        // and use the setup method to
        // provide default store values.
        setup: (cls, req) => {
          //Generating uuid and setting it in cls
          const uniqueRequestId = uuidv4();
          cls.set('traceId', uniqueRequestId);

          //Getting uuid from cls and setting it
          // for every outgoing api request to a service
          // made using corresponding service's generated SDK
          OpenAPI.HEADERS = async () => {
            console.log('picking trace id', cls.get('traceId'));
            return { 'X-Trace-ID': cls.get('traceId') };
          };
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
