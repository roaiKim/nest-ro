import {JwtService} from "@nestjs/jwt"
import { UserService } from "module/user/user.service"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(name: string, password: string): Promise<any> {
        console.log("AuthService-validateUser:", name, password)
        const user = await this.userService.getUser(name)
        console.log("userService-user:", user.password)
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
    async login(user: {name: string; sub: string}) {
        console.log("userService-login:", user)
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