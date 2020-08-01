import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Redirect, UseGuards, Delete, Res, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { RoResponse, UserGetUserResponse, UserGetUserRequest, UserUpdateUserRequest, PageLimitResponse } from './type';
import { UserRole } from 'guards/user.roles.guard';
import { UserEntity } from './user.entity';
import { Response } from 'express'
import { AuthService } from 'module/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService/* , private readonly authService: AuthService */) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() request: UserGetUserRequest): Promise<RoResponse<any>> {
    const user = await this.userService.login(request)
    return {code: 0, message: "OK",data: {}};
    // return this.authService.creatFicate({username: user.name, sub: user.id})
  }

  @UseGuards(UserRole)
  @SetMetadata("roles", "admin")
  @Get('get')
  async getUser(@Query() request: UserGetUserRequest): Promise<RoResponse<UserEntity>> {
    const user = await this.userService.getUser(request.name)
    return {code: 0, message: "OK",data: {...user}};
  }

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
}
