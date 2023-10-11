import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { RolesGuard } from '../guards/roles.guard';

export const ROLES_KEY = Symbol('roles');
export const Roles = (roles: UserRole[]): PropertyDecorator => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(RolesGuard)
  );
};
