import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto';
import { AccountService } from './account.service';
import { Account } from 'src/entities/account.entity';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createAccount(@Body() createAccount: CreateAccountDto) {
    return this.accountService.createAccount(createAccount);
  }
  @Patch(':accountId')
  updateAccount(
    @Param('accountId') accountId: number,
    @Body() updateAccount: UpdateAccountDto,
  ) {
    return this.accountService.updateAccount(accountId, updateAccount);
  }
  // Set globe so this line not needed
  // @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':accountId')
  findOne(@Param('accountId') accountId: number): Promise<Account> {
    return this.accountService.findAccount(accountId);
  }
  @Get()
  // @CacheKey('accounts_key')
  // @CacheTTL(120)
  async getAllAccount() {
    return this.accountService.getAllAccount();
  }
}
