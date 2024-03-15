import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
