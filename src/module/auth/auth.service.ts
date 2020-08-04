import {JwtService} from "@nestjs/jwt"
import { UserService } from "module/user/user.service"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { RoResponse } from "module/user/type"
import { UserEntity } from "module/user/user.entity"

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(name: string, password: string): Promise<UserEntity> {
        const user = await this.userService.login(name, password)
        if (user) {
            return user
        } else {
            throw new HttpException({
                error: "用户名或密码错误",
                message: "用户名或密码错误"
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async login(user: {name: string; userId: string}): Promise<RoResponse<string>> {
        try {
            const token = this.jwtService.sign(user)
            return {
                code: 0,
                data: token,
                message: "登录成功"
            }
        } catch (error) {
            return {
                code: 12,
                message: "账号或密码错误",
                data: null
            }
        }
    }
}