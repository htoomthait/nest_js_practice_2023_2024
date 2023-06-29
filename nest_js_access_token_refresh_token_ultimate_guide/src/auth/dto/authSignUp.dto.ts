import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class AuthSignUpDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
