import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  catId: number;
  @Column()
  name: string;
  @Column()
  color: string;
  @Column({ default: true })
  number: number;
}
