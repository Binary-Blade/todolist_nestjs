import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100, nullable: true })
  username?: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
