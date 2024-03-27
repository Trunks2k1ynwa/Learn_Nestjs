import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/utils/role.enum';
import { ROLES_KEY } from 'src/utils/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get value from metaData with property is ROLES_KEY
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // if any route that don't have @Roles(Role.Admin) so skip check logic permission below
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('🚀 ~ user:', user);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
