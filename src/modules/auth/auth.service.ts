import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

export interface JWTTokens {
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async signup(email: string, password: string) {
    const userExist = await this.usersService.findEmail(email);
    if (userExist) throw new BadRequestException('Account already exists');

    const passwordHashed = await this.hashPassword(password);
    const user = await this.usersService.create({
      email,
      password: passwordHashed,
    });

    // Exclude sensitive fields before returning
    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDTO): Promise<JWTTokens> {
    const { email, password } = loginDto;
    const user = await this.usersService.findEmail(email);

    if (user) {
      const validPassword = await argon2.verify(user.password, password);

      if (!validPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.getTokens(user)
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshToken(token: string): Promise<JWTTokens> {
    try {

      const { sub: email } = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
      });

      const user = await this.usersService.findEmail(email);
      return this.getTokens(user);

    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private hashPassword(password: string): Promise<string> {
    return argon2.hash(password)
  }

  private async getTokens(user: User): Promise<JWTTokens> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.email },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
        }
      ),
      this.jwtService.signAsync(
        { sub: user.email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
        }
      ),
    ]);
    return { token, refreshToken }
  }

}
