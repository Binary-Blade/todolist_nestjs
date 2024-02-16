import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async create(userDetails: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userDetails);
    return this.usersRepository.save(newUser);
  }


  findEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { email } })
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    if (!id)
      throw new NotFoundException('No user ID provided');


    const user = await this.usersRepository.findOneBy({ userId: id });

    if (!user)
      throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ userId: id });

    if (!user)
      throw new NotFoundException('User not found');

    Object.assign(user, userData);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ userId: id });

    if (!user)
      throw new NotFoundException('User not found');


    await this.usersRepository.remove(user);
  }
}
