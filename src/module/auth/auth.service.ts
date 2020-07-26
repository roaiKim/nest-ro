import {JwtService} from "@nestjs/jwt"

export class AuthService {
    constructor (private readonly jwtServide: JwtService) {

    }

    async validateUser(username: string, password: string): Promise<any> {
        return null
    }
}