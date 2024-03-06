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

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Post('create-account')
  @UsePipes(new ValidationPipe({ transform: true }))
  createAccount(@Body() createAccount: CreateAccountDto) {
    return this.accountService.createAccount(createAccount);
  }
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id === 'number'); // true
    return 'This action returns a user';
  }
}
