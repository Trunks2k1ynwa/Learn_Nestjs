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
    console.log('🚀 ~ createAccount:', createAccount);
    const account = this.accountRepository.create(createAccount);
    await this.accountRepository.save(account);
    return account;
  }
}
