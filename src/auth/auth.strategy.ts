import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super()
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username)
        if (!user) {
            throw new UnauthorizedException()
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException()
        }
        return user
    }
}