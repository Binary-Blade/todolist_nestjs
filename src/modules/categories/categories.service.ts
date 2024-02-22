import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all categories`;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ categoryId: id });
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
