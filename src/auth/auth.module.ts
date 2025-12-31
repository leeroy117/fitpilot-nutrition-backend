import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';

import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RefreshTokensModule,
    JwtModule.register({
      secret: jwtConstants.secret, // We use this strictly for signing access tokens synchronously if needed, usually passed in sign() options but good default
      signOptions: { expiresIn: jwtConstants.expiresIn as any },
    }),
  ],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
