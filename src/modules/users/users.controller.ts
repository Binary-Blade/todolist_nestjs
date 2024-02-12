import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

// TODO: Finish Controller
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get('/findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  find(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }
}
