import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/modules/users/entities/user.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { CreateUsersTable1622549061710, CreateCategoriesTable1622549061720, CreateTasksTable1622549061730 } from 'src/migration';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Category, Task], // Path entities
  migrations: [CreateUsersTable1622549061710, CreateCategoriesTable1622549061720, CreateTasksTable1622549061730],
});
