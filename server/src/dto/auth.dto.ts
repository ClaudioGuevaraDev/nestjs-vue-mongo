export class UserDto {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class UserRegisterDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class UserRegisterResponse {
  message: string;
}

export class UserLoginDto {
  email: string;
  password: string;
}

export class UserLoginResponse {
  message: string;
  user: UserDto;
}
