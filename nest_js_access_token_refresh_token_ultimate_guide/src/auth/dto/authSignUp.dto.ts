import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class AuthSignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
