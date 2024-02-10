import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('test')
  getHello() {
    console.log('Hello from Controller');
  }
}
