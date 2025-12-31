import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) throw new UnauthorizedException('Refresh token malformed');

    // Here we could also validate against the database if we wanted strict revocation checks
    // For now we just return the user like in the basic JWT strategy, 
    // but typically refresh strategy might return { ...payload, refreshToken }
    
    // We reuse existing user lookup for simplicity
    return this.usersService.findOne(payload.sub);
  }
}
