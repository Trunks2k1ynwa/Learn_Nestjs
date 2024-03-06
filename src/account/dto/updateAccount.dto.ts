import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './createAccount.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
