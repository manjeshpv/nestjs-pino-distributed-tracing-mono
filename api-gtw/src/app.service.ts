import { Injectable } from '@nestjs/common';
import { PinoAPI } from './platform-sdk/pino';

@Injectable()
export class AppService {
  //Making an api call to the service using the sdk we generated
  async makeRequestToPinoPoc2() {
    return await PinoAPI.createBooking();
  }
}
