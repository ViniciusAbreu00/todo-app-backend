import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
