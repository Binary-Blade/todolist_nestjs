import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  readonly email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  readonly password: string;

  readonly role?: UserRole;
}
