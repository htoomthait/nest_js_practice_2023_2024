import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSomething(): string {
    const returnMessage = "Something can be sent back!";
    return returnMessage;

  }

}
