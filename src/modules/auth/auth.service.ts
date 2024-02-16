import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }
  // TODO: Make Nethod : Signup, Login, Logout

  /**
   * Asynchronously signs up a new user.
   * 
   * @param email The email address of the user attempting to sign up.
   * @param password The password provided by the user, to be hashed for storage.
   * @returns The created user object.
   * @throws BadRequestException if an account with the given email already exists.
   */

  async signup(email: string, password: string, username?: string) {

    const usersExist = await this.usersService.findEmail(email);

    if (usersExist.length) {
      throw new BadRequestException('Account already exists');
    }

    const passwordHashed = await argon2.hash(password);
    const user = await this.usersService.create(email, passwordHashed, username);

    return user;
  }
}
