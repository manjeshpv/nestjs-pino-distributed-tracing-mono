import { Body, Controller, Post, Headers, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/test')
  async testPost1() {
    const x = await this.appService.makeRequestToPinoPoc2();
    return x;
  }
}
