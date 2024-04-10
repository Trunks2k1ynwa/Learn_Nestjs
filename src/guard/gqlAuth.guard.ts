import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RolesGuard } from './role.guard';

@Injectable()
export class GqlRoleGuard extends RolesGuard {
  canActivate(context: ExecutionContext): boolean {
    GqlExecutionContext.create(context);
    return true;
  }
}
