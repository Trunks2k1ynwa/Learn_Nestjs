import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto';
import { AccountService } from './account.service';
import { Account } from 'src/entities/account.entity';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createAccount(@Body() createAccount: CreateAccountDto) {
    return this.accountService.createAccount(createAccount);
  }
  // Set globe so this line not needed
  // @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':accountId')
  findOne(@Param('accountId') accountId: number): Promise<Account> {
    return this.accountService.findAccount(accountId);
  }
  @Get()
  getAllAccount(): Promise<Account[]> {
    return this.accountService.getAllAccount();
  }
}
