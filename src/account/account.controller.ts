import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto';
import { AccountService } from './account.service';
import { Account } from 'src/entities/account.entity';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@Controller('api/v1/accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}
  // Create new account
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createAccount(@Body() createAccount: CreateAccountDto) {
    console.log('🚀 ~ createAccount:', createAccount);
    return this.accountService.createAccount(createAccount);
  }
  // Update account by accountId
  @Patch(':accountId')
  updateAccount(
    @Param('accountId') accountId: number,
    @Body() updateAccount: UpdateAccountDto,
  ) {
    return this.accountService.updateAccount(accountId, updateAccount);
  }

  // Get account by accountId
  @Get(':accountId')
  findOne(@Param('accountId') accountId: number): Promise<Account> {
    return this.accountService.findAccount(accountId);
  }
  // Delete account by accountId
  @Delete(':accountId')
  deleteOne(@Param('accountId') accountId: number) {
    return this.accountService.deleteAccount(accountId);
  }
  // Get all accounts
  @Get()
  // @CacheKey('accounts_key')
  // @CacheTTL(120)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async getAllAccount(): Promise<{ dataFrom: string; data: Account[] }> {
    return this.accountService.getAllAccount();
  }
}
