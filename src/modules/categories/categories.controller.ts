import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards/access-token.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post('create/:userId')
  create(@Body() createCategoryDto: CreateCategoryDto, @Param('userId') userId: string) {
    return this.categoriesService.create(createCategoryDto, +userId);
  }

  @Get('/findAll')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
