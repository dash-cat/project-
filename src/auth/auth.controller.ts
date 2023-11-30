// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = await this.usersService.create({
      username: user.username,
      password: hashedPassword,
      id: ''
    });
    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const payload = { username: req.user.username, sub: req.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}