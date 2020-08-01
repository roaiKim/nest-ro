import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {jwtConstants} from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrkey: jwtConstants.secret
        })
    }

    validate(payload: {sub: string, username: string}): any {
        console.log('JwtStrategy.validate', payload)
        return {userId: payload.sub, username: payload.username}
    }
}
