import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateAccountDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  role: Role;
}
