import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; import * as argon2 from 'argon2';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '../users/entities/user.entity';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentiels.exception';

export interface JWTTokens {
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async signup(email: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('Email already registered!', 400);
    }
    const passwordHashed = await this.hashPassword(password);

    await this.userRepository.save({
      email,
      password: passwordHashed,
      role: UserRole.USER,
    });
  }

  async login(loginDto: LoginDTO): Promise<JWTTokens> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });
    console.log(user)
    const validPassword = await argon2.verify(user.password, password);

    if (!user) throw new InvalidCredentialsException();
    if (!validPassword) throw new InvalidCredentialsException();

    return this.getTokens(user);
  }

  async refreshToken(token: string): Promise<JWTTokens> {
    try {
      const { sub: userId } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      const user = await this.userRepository.findOneOrFail({ where: { userId } });

      return this.getTokens(user);
    } catch (err) {
      throw new InvalidCredentialsException();
    }
  }

  private hashPassword(password: string): Promise<string> {
    return argon2.hash(password)
  }

  private async getTokens(user: User): Promise<JWTTokens> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.userId, role: user.role },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
        }
      ),
      this.jwtService.signAsync(
        { sub: user.userId, role: user.role },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
        }
      ),
    ]);
    return { token, refreshToken }
  }
}
