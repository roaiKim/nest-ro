import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "module/user/user.module";
import { UserService } from "module/user/user.service";

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60s'
            }
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
    exports: [AuthService]
})
export class AuthModule {}
