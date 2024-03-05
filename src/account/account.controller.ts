import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Post('create-account')
  createAccount(@Body() createAccount: CreateAccountDto) {
    console.log('🚀 ~ createAccount:', createAccount);
    return this.accountService.createAccount(createAccount);
  }
}
