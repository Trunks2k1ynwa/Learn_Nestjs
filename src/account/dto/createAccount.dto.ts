import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateAccountDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  readonly role: Role;
}
