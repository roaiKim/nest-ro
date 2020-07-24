import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RoResponse, UserGetUserResponse, UserGetUserRequest } from './type';
import { UserRole } from 'guards/user.roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getuser')
  @UseGuards(UserRole)
  getHello(@Query() res: UserGetUserRequest): RoResponse<UserGetUserResponse> {
    console.log("res-343e>", res)
    return {code: 0, message: "OK",data: {...this.userService.getHello(res)}};
  }

  @Post('getuser')
  postHello(@Body() res: UserGetUserRequest): RoResponse<UserGetUserResponse> {
    console.log("res-4343>", res)
    return {code: 0, message: "OK",data: {...this.userService.getHello(res)}};
  }

  @Get(':name/:age')
  getUserByName(@Param('name') name: string, @Param('age', new ParseIntPipe()) age: string): RoResponse<UserGetUserResponse> {
    console.log("res-的是r>", typeof age, typeof name)
    return {code: 0, message: "OK",data: { name: age}};
  }
}
