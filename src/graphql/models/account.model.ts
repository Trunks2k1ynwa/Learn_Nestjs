import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/utils/role.enum';

@ObjectType()
export class Account {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field(() => String, { nullable: true })
  email: string;
  @Field(() => String, { nullable: true })
  username: string;
  @Field({ nullable: true })
  password: string;
  @Field(() => String, { nullable: true })
  role: Role;
}
