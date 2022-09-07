import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  UserLoginDto,
  UserLoginResponse,
  UserRegisterDto,
  UserRegisterResponse,
} from 'src/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  userRegister(@Body() user: UserRegisterDto): Promise<UserRegisterResponse> {
    return this.authService.userRegister(user);
  }

  @Post('login')
  @HttpCode(200)
  userLogin(
    @Body() user: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserLoginResponse> {
    return this.authService.userLogin(user, response);
  }

  @Get('check-user')
  @HttpCode(200)
  checkUser(@Req() request: Request): Promise<UserLoginResponse> {
    return this.authService.checkUser(request);
  }

  @Get('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
