import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  user = {
    id: 1,
    name: 'John',
    email: 'text@example.com',
    refreshToken: '',
  };

  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private readonly _prismaService: PrismaService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.hashedPassword, password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token);

    return { tokens, user };
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async register({ email, name, password}: RegisterDto) {
    const hash = await argon.hash(password);

    const user = await this._prismaService.user
      .create({
        data: {
          email,
          hashedPassword: hash,
          name
        },
      })
      .catch((error) => {
        if (error) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

      console.log({ userFin: user});
      

    const tokens = await this.getTokens(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  logout() {
    return {};
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');
    // if (userId !== this.user.id) {
    //   throw new ForbiddenException('Invalid token');
    // }

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  getUserInfo() {
    return {
      id: 1,
      name: 'John',
      email: 'text@example.com',
    };
  }
}
