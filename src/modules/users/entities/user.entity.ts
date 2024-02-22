import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './../../tasks/entities/task.entity';
import { Category } from './../../categories/entities/category.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  userId: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
  role: UserRole;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}

