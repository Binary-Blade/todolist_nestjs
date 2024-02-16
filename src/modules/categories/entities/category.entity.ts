import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './../../users/entities/user.entity';
import { Task } from './../../tasks/entities/task.entity';


@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  categoryId: number;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}

