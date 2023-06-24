import {
    Controller,
    Post,
    Body,
    Get,
    HttpCode,
    UseGuards,
    Request,
    HttpStatus,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dto/login.dto';
  import { RegisterDto } from './dto/register.dto';
  import { Public } from './decorators/public.decorator';
  import { RefreshTokenGuard } from './guards/refresh-token.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly _authService: AuthService) {}
  
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() payload: LoginDto) {

      console.log({payload});
      
      return this._authService.login(payload);
    }
  
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout() {
      return this._authService.logout();
    }
  
    @Get('refresh')
    @UseGuards(RefreshTokenGuard)
    refresh(@Request() request) {
      const { refreshToken, sub: userId } = request;
      return this._authService.refresh(userId, refreshToken);
    }
  
    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() payload: RegisterDto) {
      console.log({payloadReg: payload});
      
      return this._authService.register(payload);
    }
  
    @Get('user-info')
    getUserInfo() {
      return this._authService.getUserInfo();
    }
  }