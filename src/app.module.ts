import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['../.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'), // Database host
          port: config.get<number>('DB_PORT'), // Database port
          username: config.get<string>('DB_USERNAME'), // Database username
          password: config.get<string>('DB_PASSWORD'), // Database password
          database: config.get<string>('DB_NAME'), // Database name
          entities: [__dirname + '**/**/*.entity{.ts,.js}'], // Path to your entities
          synchronize: config.get<boolean>('DB_SYNCHRONIZE'), // Synchronize the database state with the models on application startup
        };
      },
    }),
    CategoriesModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}
