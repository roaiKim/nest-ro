import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, UserGetUserResponse } from './type';

@Controller('ajax/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getuser')
  getHello(@Query() res: string): Response<UserGetUserResponse> {
    console.log("res->", res)
    return {code: 0, message: "OK",data: {name: this.appService.getHello()}};
  }
}
