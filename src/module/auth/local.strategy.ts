import {Strategy} from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'name',
            passwordField: 'password',
          })
    }

    async validate(name: string, password: string): Promise<any> {
        console.log("localStrategy-validate:", name, password)
        const user = await this.authService.validateUser(name, password)
        if (!user) {
            throw new HttpException({ 
                message: 'authorized failed',
                error: 'please try again later.' 
            },HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}
