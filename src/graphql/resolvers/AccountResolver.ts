import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from 'src/account/account.service';
import { Account } from '../models/account.model';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private accountService: AccountService) {}
  @Query(() => Account, { nullable: true })
  getAccount() {
    return {
      id: 1,
      email: 'Trung',
      username: 'Le van trung',
    };
  }
  @Query(() => Account)
  async getAccountId(@Args('id', { type: () => Int }) id: number) {
    return this.accountService.findAccountById(id);
  }
  @Query(() => [Account])
  async getAllAccount() {
    return this.accountService.getListAccount();
  }
}
