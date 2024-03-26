import { Injectable, Logger } from '@nestjs/common';
import { error } from 'console';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    // this.logger.log(`Retrieve all AppService`);
    this.logger.error({ id: `retrieve-all-AppService-error` }, `Retrieve all AppService`) // object passed in first argument
    // throw new Error("fdfsdfdf")

    return 'Hello World!';
  }
}
