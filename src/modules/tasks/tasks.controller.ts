import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { CustomRequest } from 'src/common/interface/custom-request.interface';

//TODO: Finish and create findAllTaskInCategory controller 

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post('create/:categoryId')
  createWithCategory(
    @Param('categoryId') categoryId: string,
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: CustomRequest) {
    const userId = req.user.userId;
    return this.tasksService.create({ ...createTaskDto, categoryId: +categoryId }, userId);
  }

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: CustomRequest) {
    const userId = req.user.userId;
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get('/findAll')
  findAll(@Request() req: any) {
    const userId = req.user;
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.findOne(req.user, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req: any) {
    return this.tasksService.update(req.user, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.remove(req.user, +id);
  }
}
