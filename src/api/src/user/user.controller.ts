import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Public } from '../auth/decorators/public.decorator';
import { RegisterDto } from '../auth/dto/register.dto';
import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly _mailService: MailService,
    private readonly _userService: UserService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() payload: RegisterDto) {
    return this._userService.register(payload);
  }

  @Public()
  @Post('contact')
  @HttpCode(HttpStatus.OK)
  sendContactMail(@Body() { from, message }: any) {
    console.log({ from, message });

    this._mailService.sendMail(from, message);

    return {
      ok: true,
      msg: 'Message sended',
    };
  }
}
