import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PinoModule} from "./common/plugin-pino-logger";
const prodImports = [];
if (process.env.NODE_ENV !== 'development') {
  prodImports.push(PinoModule);
}
@Module({
  imports: [
      ...prodImports,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
