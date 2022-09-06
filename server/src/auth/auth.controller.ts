import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserRegisterDto, UserRegisterResponse } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(201)
  userRegister(@Body() user: UserRegisterDto): Promise<UserRegisterResponse> {
    return this.authService.userRegister(user);
  }
}
