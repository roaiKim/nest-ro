import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { UserService } from '../module/user/user.service';

@Injectable()
export class UserRole implements CanActivate {
    constructor(private readonly userService: UserService) {}
    canActivate(context: ExecutionContext): boolean {
        const headers = context.switchToHttp().getRequest().headers
        console.log('re', headers)
        console.log('userService', this.userService.getRoles("ro"))
        return false
    }
}
