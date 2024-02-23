import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req: any) {
    return this.categoriesService.create(createCategoryDto, req.user.userId);
  }

  @Get('/findAll')
  findAll(@Request() req: any) {
    return this.categoriesService.findAll(req.user);
  }

  @Get('/:id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.categoriesService.findOne(req.user, +id);
  }

  @Patch('/:id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(req.user, +id, updateCategoryDto);
  }

  @Delete('/:id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.categoriesService.remove(req.user, +id);
  }
}
