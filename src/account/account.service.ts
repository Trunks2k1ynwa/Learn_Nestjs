import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  async createAccount(createAccount: CreateAccountDto) {
    const account = this.accountRepository.create(createAccount);
    await this.accountRepository.save(account);
    return account;
  }
  async getAllAccount(): Promise<Account[]> {
    return await this.accountRepository.find();
  }
  async findAccount(accountId: number): Promise<Account> {
    return await this.accountRepository.findOneBy({ id: accountId });
  }
  async updateAccount(accountId: number) {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    await this.accountRepository.update(accountId, account);
  }
}
