import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccountService } from 'src/account/account.service';
import { CreateAccountDto } from 'src/account/dto/createAccount.dto';
import { jwtConstants, saltPassword } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    @Inject(forwardRef(() => AccountService))
    private accountRepository: Repository<Account>,
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  async handleTokenAndCookie(payload, res) {
    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
    });
    res.cookie('access_token', access_token, {
      secure: true,
      maxAge: 60 * 60,
      sameSite: true,
    });
    return access_token;
  }
  async signIn(username: string, pass: string, res: Response): Promise<any> {
    const user = await this.accountService.findAccountByUserName(username);
    if (!user) {
      throw new UnauthorizedException(
        `Account with username doesn't exits in database`,
      );
    }
    const checkMatchPassword = await bcrypt.compare(pass, user.password);
    if (!checkMatchPassword) {
      throw new UnauthorizedException(`Wrong password, please sign-in again`);
    }
    const payload = {
      accountId: user.id,
      username: user.username,
      role: user.role,
    };
    const access_token = await this.handleTokenAndCookie(payload, res);
    return {
      access_token,
    };
  }
  async signUp(
    createAccount: CreateAccountDto,
    res: Response,
  ): Promise<{ data: Account; access_token: string }> {
    const { password, email } = createAccount;
    const checkAccountExist = await this.accountRepository.findOne({
      where: { email },
    });
    if (checkAccountExist) {
      res.status(200).json({
        message:
          'This email is already on the system, please log in with this email.',
      });
    } else {
      const hashPassword = await bcrypt.hash(password, saltPassword);
      const account = this.accountRepository.create({
        ...createAccount,
        password: hashPassword,
      });
      const payload = {
        username: account.username,
        email: account.email,
        role: account.role,
      };
      const access_token = await this.handleTokenAndCookie(payload, res);
      await this.accountRepository.save(account);
      return { data: account, access_token };
    }
  }
  async signOut(res: Response) {
    res.clearCookie('access_token');
    res.setHeader('Authorization', '');
    res.status(200).json({ message: 'Sign out successfully' });
  }
  async getCurrent(email): Promise<Account> {
    return this.accountService.findAccountByEmail(email);
  }
}
