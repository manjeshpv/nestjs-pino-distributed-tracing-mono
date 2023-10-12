import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log(
      'Trace Id should be same in the service as in the Controller',
    );
    return 'Hello World!';
  }
}
