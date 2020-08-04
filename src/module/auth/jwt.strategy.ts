import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {jwtConstants} from './constants';
import { JwtUserToken } from './auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    validate(user: JwtUserToken): JwtUserToken {
        return user
    }
}
