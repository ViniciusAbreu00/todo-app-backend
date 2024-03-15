import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
