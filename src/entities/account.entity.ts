import { Exclude, Expose, Transform } from 'class-transformer';
import { Role } from 'src/utils/role.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Transform(({ value }) => value.toUpperCase())
  @Index({ unique: true })
  email: string;
  @Column({ default: 'User Anonymous' })
  username: string;
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
  @Column({ default: Role.User })
  role?: Role;
  @Expose()
  get detailAccount(): string {
    return `${this.id} ${this.username}`;
  }
}
