import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  async canActivate (
    context: ExecutionContext
  ): Promise<boolean> {
    const roles = this.reflector.get<UserRole>(ROLES_KEY, context.getHandler());
    if (roles === undefined || roles === null || roles.length === 0) return true;

    const ctx = GqlExecutionContext.create(context);
    const reqUser = ctx.getContext().req.user;
    const user = await this.userService.findOne({
      where: {
        id: reqUser.id
      }
    });

    return roles.includes(user.role);
  }
}
