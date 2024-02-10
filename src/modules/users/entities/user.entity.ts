import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
