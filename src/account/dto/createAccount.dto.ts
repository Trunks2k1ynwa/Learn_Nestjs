import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'src/utils/role.enum';

export class CreateAccountDto {
  @ApiProperty({
    example: 'roberthoang@gmail.com',
    description: 'Email of account',
    minimum: 1,
    default: 1,
  })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @ApiProperty({ enum: ['user', 'admin'] })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
