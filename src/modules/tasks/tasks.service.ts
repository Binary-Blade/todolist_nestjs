import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

// TODO: Put second parameters userId: number to user: User for more constance

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto, userId: number,): Promise<Task> {
    const { categoryId, active, ...taskDetails } = createTaskDto;
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) throw new NotFoundException('User not found');

    let category = null;
    if (categoryId) {
      category = await this.categoryRepository.findOne({
        where: { categoryId },
        relations: ['user']
      });
      if (category.user.userId !== user.userId) throw new NotFoundException('Category not found');
      if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    const newTask = this.taskRepository.create({
      active: false,
      user,
      category,
      ...taskDetails,
    });
    return this.taskRepository.save(newTask);
  }

  findAll(user: User): Promise<Task[]> {
    return this.taskRepository.findBy({ user: { userId: user.userId } });
  }

  async findAllInCategory(user: User, categoryId: number): Promise<Task[]> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId, user: { userId: user.userId } },
      relations: ['tasks', 'user'],
    });
    if (category.user.userId !== user.userId) throw new NotFoundException('Category not found');
    if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found for this user`);

    return this.taskRepository.find({
      where: { category: { categoryId: category.categoryId }, user: { userId: user.userId } },
      relations: ['category', 'user'],
    });
  }

  async findOne(user: User, id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(
      { where: { taskId: id }, relations: ['user'] }
    );
    if (task.user.userId !== user.userId) throw new NotFoundException('Task not found');
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(user: User, id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne(
      { where: { taskId: id }, relations: ['user'] }
    );
    if (task.user.userId !== user.userId) throw new NotFoundException('Task not found');
    if (!task) throw new NotFoundException('Task not found');

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(user: User, id: number) {
    const task = await this.taskRepository.findOne(
      { where: { taskId: id }, relations: ['user'] }
    );
    if (task.user.userId !== user.userId) throw new NotFoundException('Task not found');
    if (!task) throw new NotFoundException('Task not found');

    await this.taskRepository.remove(task);
  }
}
