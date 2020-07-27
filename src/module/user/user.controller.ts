import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RoResponse, UserGetUserResponse, UserGetUserRequest, UserUpdateUserRequest } from './type';
import { UserRole } from 'guards/user.roles.guard';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() password: string): RoResponse<UserGetUserResponse> {
    return {code: 0, message: "OK",data: { name: password}};
  }

  /* @Get('getuser')
  @UseGuards(UserRole)
  getHello(@Query() res: UserGetUserRequest): RoResponse<UserGetUserResponse> {
    return {code: 0, message: "OK",data: {...this.userService.getHello(res)}};
  } */

  @Get('getuserlist')
  async postHello(@Query() res: UserGetUserRequest): Promise<RoResponse<UserEntity[]>> {
    const user = await this.userService.getUserList(res)
    console.log('--res-->', user)
    /// @ts-ignore
    return {code: 0, message: "OK",data: {list: user}};
  }

  @Post('get')
  async getUserByName(@Body() res: UserGetUserRequest): Promise<any> {
    const user = await this.userService.getUser(res.name)
    console.log("user--->", user);
    return {code: 0, message: "OK",data: {...user}};
  }

  @Post('create')
  async createUser(@Body() request: UserGetUserRequest): Promise<any> {
    const user = await this.userService.createUser(request.name, request.password)
    console.log("user--->", user);
    return {code: 0, message: "OK",data: user};
  }

  @Post('update/:id')
  async updateUser(@Param('id') id: string, @Body() request: UserUpdateUserRequest): Promise<any> {
    const user = await this.userService.updateUser(id, request.name)
    console.log("user--->", user);
    return {code: 0, message: "OK",data: user};
  }

  @Put('detele')
  async deteleUser(@Body() request: UserGetUserRequest): Promise<any> {
    const user = await this.userService.deteleUser(request.name)
    console.log("user--->", user);
    return {code: 0, message: "OK",data: user};
  }

  @Post()
  changePassword(@Body() password: string): RoResponse<UserGetUserResponse> {
    return {code: 0, message: "OK",data: { name: password}};
  }
}
