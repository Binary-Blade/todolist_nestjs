import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class LoginDTO {

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
