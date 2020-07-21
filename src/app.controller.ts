import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RoResponse, UserGetUserResponse, UserGetUserRequest } from './type';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getuser')
  getHello(@Query() res: UserGetUserRequest): RoResponse<UserGetUserResponse> {
    console.log("res->", res)
    return {code: 0, message: "OK",data: {...this.appService.getHello(res)}};
  }

  @Post('getuser')
  postHello(@Body() res: UserGetUserRequest): RoResponse<UserGetUserResponse> {
    console.log("res->", res)
    return {code: 0, message: "OK",data: {...this.appService.getHello(res)}};
  }
}
