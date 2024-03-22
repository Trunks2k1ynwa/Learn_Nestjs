import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AccountService {
  logger: Logger;
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('test-queue') private audioQueue: Queue,
  ) {
    this.logger = new Logger(AccountService.name);
  }
  async findAllQueues() {
    const accounts = await this.accountRepository.find();
    await this.audioQueue.add(
      'register',
      { data: accounts },
      {
        priority: 1,
        delay: 200,
        removeOnFail: true,
        removeOnComplete: true,
      },
    );
    return accounts;
  }
  async createAccount(createAccount: CreateAccountDto) {
    const account = this.accountRepository.create(createAccount);
    await this.accountRepository.save(account);
    this.cacheManager.del('accounts_key');
    const job = await this.audioQueue.add(
      {
        delay: 3000,
      },
      {
        priority: 2,
      },
    );
    console.log('🚀 ~ job:', job);
    return account;
  }

  async getAllAccount(): Promise<{ dataFrom: string; data: Account[] }> {
    this.logger.debug('logger all account');
    const cachedData: Account[] = await this.cacheManager.get('accounts_key');
    if (cachedData) {
      // Giá trị đã tồn tại trong cache
      return {
        dataFrom: 'From cache',
        data: cachedData,
      };
    }
    const accounts = await this.accountRepository.find();
    await this.cacheManager.set('accounts_key', accounts, 0);

    return {
      dataFrom: 'From Database',
      data: accounts,
    };
  }
  async findAccount(accountId: number): Promise<Account> {
    return await this.accountRepository.findOneBy({ id: accountId });
  }
  async updateAccount(accountId: number, dataUpdate: UpdateAccountDto) {
    await this.accountRepository.update(accountId, dataUpdate);
  }
  async deleteAccount(accountId: number) {
    const account = await this.findAccount(accountId);
    this.cacheManager.del('accounts_key');
    return await this.accountRepository.remove(account);
  }
}
