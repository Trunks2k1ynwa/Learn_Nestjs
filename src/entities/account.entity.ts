import { Role } from 'src/enum/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: Role.USER })
  role: string;
}
