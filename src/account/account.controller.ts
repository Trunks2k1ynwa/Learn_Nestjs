import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  Res,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from 'src/entities/account.entity';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { Request, Response } from 'express';
import { Cookies } from 'src/utils/cookies.decorator';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/utils/role.enum';

@Controller('api/v1/accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Get('queue')
  testQueue(@Req() request: Request, @Cookies('token') name: string) {
    console.log('cookies', name, request.cookies);
    return this.accountService.findAllQueues();
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
    return this.accountService.findAccountById(accountId);
  }
  // Delete account by accountId
  @Delete(':accountId')
  @Roles(Role.Admin)
  deleteOne(@Param('accountId') accountId: number, @Res() response: Response) {
    return this.accountService.deleteAccount(accountId, response);
  }
  // Get all accounts
  // @UseGuards(RolesGuard)
  @Get()
  @Roles(Role.Admin)
  // @CacheKey('accounts_key')
  // @CacheTTL(120)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async getAllAccount(
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ dataFrom: string; data: Account[] }> {
    response.cookie('token', 'Day la cookie le van trunk', {
      // secure: true,
      httpOnly: true,
    });
    return this.accountService.getAllAccount();
  }
}
