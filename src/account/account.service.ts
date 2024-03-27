import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Response } from 'express';

@Injectable()
export class AccountService {
  logger: Logger;
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('test-queue') private audioQueue: Queue,
    private eventEmitter: EventEmitter2,
  ) {
    this.logger = new Logger(AccountService.name);
  }
  async findAllQueues() {
    this.eventEmitter.emit('order.created', {
      value: 'eventEmitter',
    });
    this.logger.error('findAllQueues');
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
  @OnEvent('order.created')
  handleOrderCreatedEvent(payload: any) {
    console.log('🚀 ~ payload:', payload);
    // handle and process "OrderCreatedEvent" event
  }

  async getAllAccount(): Promise<{ dataFrom: string; data: Account[] }> {
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
  async findAccountById(accountId: number): Promise<Account> {
    return await this.accountRepository.findOneBy({ id: accountId });
  }
  async findAccountByEmail(email: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: { email },
    });
  }
  async updateAccount(accountId: number, dataUpdate: UpdateAccountDto) {
    await this.accountRepository.update(accountId, dataUpdate);
    return this.findAccountById(accountId);
  }
  async deleteAccount(accountId: number, response: Response) {
    const account = await this.findAccountById(accountId);
    if (!account) {
      return response.status(400).json({
        statusCode: 401,
        message: `This account doesn't exist in the database`,
      });
    } else {
      await this.accountRepository.remove(account);
      return 'Delete account successfully';
    }
  }
  async findAccountByUserName(username: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: { username },
    });
  }
}
