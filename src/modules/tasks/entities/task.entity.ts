import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('increment')
  taskId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Category, (category) => category.tasks)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;
}

