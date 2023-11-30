import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from '../users/user.service';
import { AuthStrategy } from './auth.strategy';
import { JwtStrategy } from 'passport-jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    {
      provide: AuthStrategy,
      useClass: forwardRef(() => AuthStrategy),
    },
    JwtStrategy,
  ],
  exports: [AuthStrategy],
})
export class AuthModule {}
