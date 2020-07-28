import {JwtService} from "@nestjs/jwt"
import { UserService } from "module/user/user.service"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

@Injectable()
export class AuthService {
    constructor (private readonly jwtService: JwtService, private readonly userService: UserService) {

    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUser(username)
        if (user) {
            if (user.password === password) {
                return user
            } else {
                throw new HttpException({
                    error: "密码错误啊",
                    message: "密码错误"
                }, HttpStatus.BAD_REQUEST)
            }
        } else {
            throw new HttpException({
                error: "没有这个人",
                message: "没有这个人啊"
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async creatFicate(user: {username: string; sub: string}) {
        try {
            const token = this.jwtService.sign(user)
            return {
                code: 0,
                data: {
                    token
                },
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