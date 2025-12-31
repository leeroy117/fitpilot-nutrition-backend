import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokensService: RefreshTokensService,
  ) {}

  async signup(signupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = await this.usersService.create({
      ...signupDto,
      password: hashedPassword,
    });
    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  async generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn as any,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.refreshExpiresIn as any,
    });

    await this.storeRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async storeRefreshToken(userId: number, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    try {
      await this.refreshTokensService.create({
        user_id: userId,
        token: token,
        expires_at: expiresAt.toISOString(),
      });
    } catch (e) {
      if (e.code !== 'P2002') {
         throw e;
      }
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secret,
      });
      const tokenRecord = await this.refreshTokensService.findByToken(refreshToken);
      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // In real scenario, check if revoked or expired DB side too

      const user = await this.usersService.findOne(payload.sub);
      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number) {
      // In a real app, you might blacklist the token or delete the specific one
      // For now we can delete all for user or just handle client side
      // Ideally we delete the specific refresh token passed
      return { message: 'Logged out successfully' };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersService.findByEmail(updatePasswordDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const hashedPassword = await bcrypt.hash(updatePasswordDto.password, 10);
    
    // We update the user with the new hashed password
    await this.usersService.update(user.id, {
      password: hashedPassword,
    });
    
    return { message: 'Password updated successfully' };
  }
}
