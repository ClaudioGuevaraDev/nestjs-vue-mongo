export class UserRegisterDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class UserRegisterResponse {
  message: string;
}
