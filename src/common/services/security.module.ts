import { Module } from '@nestjs/common';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Module({
  imports: [CategoriesModule, TasksModule],
  providers: [CategoriesService, TasksService],
})
export class AppModule { }
