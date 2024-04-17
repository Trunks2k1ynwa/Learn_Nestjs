import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';

@Injectable()
export class GqlAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('super guard');
    GqlExecutionContext.create(context);
    return true;
  }
}
