import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserDto,
  UserLoginDto,
  UserLoginResponse,
  UserRegisterDto,
  UserRegisterResponse,
} from 'src/dto/auth.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { hash, compare } from 'bcrypt';
import { sign, decode } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { serialize } from 'cookie';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async userRegister(user: UserRegisterDto): Promise<UserRegisterResponse> {
    const userFound = await this.userModel.findOne({
      username: user.username,
    });
    if (userFound)
      throw new HttpException('El username ya existe.', HttpStatus.BAD_REQUEST);

    const userEmailFound = await this.userModel.findOne({
      email: user.email,
    });
    if (userEmailFound)
      throw new HttpException('El email ya existe', HttpStatus.BAD_REQUEST);

    if (user.password !== user.confirmPassword)
      throw new HttpException(
        'Las contraseñas no coinciden.',
        HttpStatus.BAD_REQUEST,
      );

    try {
      const hashedPassword = await hash(user.password, 10);

      this.userModel.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });

      return { message: 'Usuario registrado con éxito.' };
    } catch (error) {
      throw new HttpException(
        'Error al registrar el usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async userLogin(
    user: UserLoginDto,
    response: Response,
  ): Promise<UserLoginResponse> {
    const userFound: UserDto = await this.userModel.findOne({
      email: user.email,
    });
    if (!userFound)
      throw new HttpException(
        'Error al iniciar sesión.',
        HttpStatus.UNAUTHORIZED,
      );

    if ((await compare(user.password, userFound.password)) === false)
      throw new HttpException(
        'Error al iniciar sesión.',
        HttpStatus.UNAUTHORIZED,
      );

    try {
      const token = sign(
        {
          email: userFound.email,
          id: userFound._id,
          username: userFound.username,
        },
        this.configService.get('JWT_SECRET'),
      );

      const serializedToken = serialize('tokennest', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        sameSite: 'strict',
        path: '/',
      });

      response.setHeader('Set-Cookie', serializedToken);

      return { message: 'Inicio de sesión con éxito.', user: userFound };
    } catch (error) {
      throw new HttpException(
        'Error al iniciar sesión.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkUser(request: Request): Promise<UserLoginResponse> {
    try {
      const { tokennest } = request.cookies;

      const decoded: any = decode(
        tokennest,
        this.configService.get('JWT_SECRET'),
      );

      return { message: 'Usuario logeado.', user: decoded };
    } catch (error) {
      throw new HttpException(
        'Error al check el usuario.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  logout(response: Response) {
    try {
      const serializedToken = serialize('tokennest', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        sameSite: 'strict',
        path: '/',
      });

      response.setHeader('Set-Cookie', serializedToken);
      return;
    } catch (error) {
      throw new HttpException(
        'Error al cerrar sesión.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
