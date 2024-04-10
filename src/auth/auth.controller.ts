import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/utils/constants';
import { CreateAccountDto } from 'src/account/dto/createAccount.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInDto.username, signInDto.password, res);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sign-up')
  @UsePipes(new ValidationPipe({ transform: true }))
  createAccount(
    @Body() createAccount: CreateAccountDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp(createAccount, res);
  }

  //UseGuards(AuthGuard) Verify Access_token before access route below
  @UseInterceptors(ClassSerializerInterceptor)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get('current-account')
  getCurrentAccount(@Request() req) {
    return this.authService.getCurrent(req.user.email);
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }
}
