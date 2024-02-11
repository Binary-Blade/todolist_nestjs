import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
// import { CategoriesModule } from './modules/categories/categories.module';
// import { TasksModule } from './modules/tasks/tasks.module';
// import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
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
          entities: [__dirname + 'src/modules/**/**/*.entity{.ts}'], // Path to your entities
          synchronize: config.get<boolean>('DB_SYNCHRONIZE'), // Synchronize the database state with the models on application startup
        };
      },
    }),
    UsersModule,
    // CategoriesModule,
    // TasksModule,
    // AuthModule,
  ],
})
export class AppModule {}
