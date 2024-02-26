import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from '../../common/decorators/role.decorator';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get('/findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get('/:id')
  find(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
