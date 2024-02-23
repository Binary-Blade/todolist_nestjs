import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

type JwtPayload = {
  sub: string;
  role: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? '',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // Assuming payload.sub contains the user's email
    const userEmail = payload.sub;
    const user = await this.usersRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new UnauthorizedException();
    }
    // Return the user object or a part of it
    return user;
  }

}
