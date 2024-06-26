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
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiBody({ type: UpdateAccountDto })
  @ApiTags('Account')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Account,
  })
  updateAccount(
    @Param('accountId') accountId: number,
    @Body() updateAccount: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountService.updateAccount(accountId, updateAccount);
  }

  // Get account by accountId
  @Get(':accountId')
  @ApiTags('Account')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Account,
  })
  findAccountId(@Param('accountId') accountId: number): Promise<Account> {
    return this.accountService.findAccountById(accountId);
  }
  // Delete account by accountId
  @Delete(':accountId')
  @ApiTags('Account')
  @Roles(Role.Admin)
  deleteOne(@Param('accountId') accountId: number, @Res() response: Response) {
    return this.accountService.deleteAccount(accountId, response);
  }
  // Get all accounts
  // @UseGuards(RolesGuard)
  @Get()
  @ApiTags('Account')
  @Roles(Role.Admin)
  // @CacheKey('accounts_key')
  // @CacheTTL(120)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Account,
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
