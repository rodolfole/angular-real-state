import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { RegisterDto } from '../auth/dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() payload: RegisterDto) {
    console.log({ payloadReg: payload });

    return this._userService.register(payload);
  }
}
