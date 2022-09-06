import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterDto, UserRegisterResponse } from 'src/dto/auth.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async userRegister(user: UserRegisterDto): Promise<UserRegisterResponse> {
    try {
      const userFound = await this.userModel.findOne({
        username: user.username,
      });
      if (userFound)
        throw new HttpException(
          'El username ya existe.',
          HttpStatus.BAD_REQUEST,
        );

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
}
