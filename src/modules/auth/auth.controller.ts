import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  async create(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password, body.username);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}
