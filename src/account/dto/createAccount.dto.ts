import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'src/utils/role.enum';

export class CreateAccountDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
