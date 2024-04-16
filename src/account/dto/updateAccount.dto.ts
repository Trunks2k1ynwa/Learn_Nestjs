import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './createAccount.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
