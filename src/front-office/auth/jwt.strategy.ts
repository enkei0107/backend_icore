import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your-secret-key',
        });
    }

    async validate(payload: { sub: string }) {
        return payload.sub;
    }
}