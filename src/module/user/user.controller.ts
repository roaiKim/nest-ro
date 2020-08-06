import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Redirect, Req,UseGuards, Delete, Res, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { RoResponse, UserGetUserResponse, UserGetUserRequest, UserUpdateUserRequest, PageLimitResponse } from './type';
import { UserRole } from 'guards/user.roles.guard';
import { JwtAuthGuard } from 'guards/auth.ext.guard';
import { UserEntity } from './user.entity';
import { Response } from 'express'
import { AuthService } from 'module/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtUserToken } from 'module/auth/auth.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() request: Request & {user: UserEntity}): Promise<RoResponse<any>> {
    const {user} = request;
    const {name, id} = user;
    return this.authService.login({name, userId: id})
  }

  // @UseGuards(UserRole)
  // @UseGuards(JwtAuthGuard)
  @SetMetadata("roles", "admin")
  @Get('get')
  async getUser(@Query() request: UserGetUserRequest): Promise<RoResponse<UserEntity[]>> {
    const user = await this.userService.getUser(request.name)
    console.log("--getUser-->", user)
    return {code: 0, message: "OK",data: {...user}};
  }

  @UseGuards(JwtAuthGuard)
  @Get('getuserlist')
  async getUserList(@Query() request: UserGetUserRequest): Promise<RoResponse<PageLimitResponse<UserEntity>>> {
    const [list, totalRecord] = await this.userService.getUserList(request)
    return {code: 0, message: "OK",data: {list, totalRecord}};
  }

  @SetMetadata("roles", ["admin", "ddd"])
  @Post('create')
  async createUser(@Body() request: UserGetUserRequest): Promise<RoResponse<string>> {
    const result = await this.userService.createUser(request.name, request.password)
    return {code: 0, message: "OK",data: result};
  }

  @Post('update/:id')
  async updateUser(@Param('id') id: string, @Body() request: UserUpdateUserRequest): Promise<RoResponse<string>> {
    const result = await this.userService.updateUser(id, request.name)
    return {code: 0, message: "OK",data: result};
  }

  @Delete('detele')
  async deteleUser(@Body() request: UserGetUserRequest): Promise<RoResponse<string>> {
    const result = await this.userService.deteleUser(request.name)
    return {code: 0, message: "OK",data: result};
  }

  @Post('change/:id')
  changePassword(@Body() password: string): RoResponse<UserGetUserResponse> {
    return {code: 0, message: "OK",data: { name: password}};
  }

  @Get('redirect')
  // @Redirect('https://www.baidu.com', 302)
  redirectLogin(@Res() response: Response): any {
    // console.log("response", response)
    // response.redirect("https://www.baidu.com")
    return response.json({data: "str" });
  }

  // 通过jwt获取user
  @UseGuards(JwtAuthGuard)
  @Get('check')
  async getCurrentUserByCookie(@Req() request: Request & {user: JwtUserToken}): Promise<RoResponse<UserEntity>> {
    const {user} = request;
    const {userId=""} = user;
    const userInfo = await this.userService.getUserByCookie(userId)
    return {code: 0, message: "OK",data: userInfo};
  }
}
