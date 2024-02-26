import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CustomRequest } from 'src/common/interface/custom-request.interface';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';
// TODO: Type Request method any, make a interface for that
@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, private tasksService: TasksService) { }

  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req: CustomRequest) {
    return this.categoriesService.create(createCategoryDto, req.user.userId);
  }

  @Get('/findAll')
  findAll(@Request() req: any) {
    return this.categoriesService.findAll(req.user);
  }

  @Get(':categoryId/tasks')
  findAllTasksInCategory(@Param('categoryId') categoryId: string, @Request() req: any): Promise<Task[]> {
    return this.tasksService.findAllInCategory(req.user, parseInt(categoryId));
  }
  @Get('/:id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.categoriesService.findOne(req.user, +id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Request() req: any) {
    return this.categoriesService.update(req.user, +id, updateCategoryDto);
  }

  @Delete('/:id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.categoriesService.remove(req.user, +id);
  }
}
