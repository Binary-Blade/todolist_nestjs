import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly role?: UserRole;
}
