import {ExecutionContext,
    Injectable,
    HttpException,
    HttpStatus,} from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): any {
        // 在这里添加自定义的认证逻辑
        // 例如调用 super.logIn(request) 来建立一个session
        return super.canActivate(context);
    }

    handleRequest(err: unknown, user: unknown, info: Record<string, unknown>): any {
        // 可以抛出一个基于info或者err参数的异常
        console.log("HttpException-err", err)
        console.log("HttpException-user", user)
        // console.log("HttpException-info", info)
        if (err || !user) {
        throw err || new HttpException({
                error: "未授权",
                message: info.toString()
            }, HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}