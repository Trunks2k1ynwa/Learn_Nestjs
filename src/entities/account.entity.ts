import { Exclude, Expose, Transform } from 'class-transformer';
import { Role } from 'src/enum/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Transform(({ value }) => value.toUpperCase())
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: Role.USER })
  role: string;
  @Expose()
  get detailAccount(): string {
    return `${this.id} ${this.password}`;
  }
  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
