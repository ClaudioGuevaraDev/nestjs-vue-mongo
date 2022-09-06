import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
  userLogin(@Body() user: UserLoginDto): Promise<UserLoginResponse> {
    return this.authService.userLogin(user);
  }
}
