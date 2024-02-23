import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category> {
    const user = await this.userRepository.findOneBy({ userId });
    const newCategory = this.categoryRepository.create(createCategoryDto);
    newCategory.user = user;
    return this.categoryRepository.save(newCategory);
  }

  findAll(user: User): Promise<Category[]> {
    return this.categoryRepository.findBy({ user: { userId: user.userId } });
  }

  async findOne(user: User, id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: id },
      relations: ['user']
    });
    if (category.user.userId !== user.userId) throw new NotFoundException('Category not found');
    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async update(user: User, id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: id },
      relations: ['user']
    });
    if (category.user.userId !== user.userId) throw new NotFoundException('Category not found');
    if (!category) throw new NotFoundException('Category not found');

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(user: User, id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: id },
      relations: ['user']
    });
    if (category.user.userId !== user.userId) throw new NotFoundException('Category not found');
    if (!category) throw new NotFoundException('Category not found');

    await this.categoryRepository.remove(category)
  }
}
