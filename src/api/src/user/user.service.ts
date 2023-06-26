import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _authService: AuthService,
  ) {}

  async register({ email, name, password }: RegisterDto) {
    const hash = await argon.hash(password);

    const user = await this._prismaService.user
      .create({
        data: {
          email,
          hashedPassword: hash,
          name,
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

    console.log({ userFin: user });

    const tokens = await this._authService.getTokens(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
