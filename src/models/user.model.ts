import { Field, HideField, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export type UserWithoutPassword = Omit<User, 'password'>;

const userRoleDefinition = {
  name: 'UserRole',
  description: 'All user roles',
  valuesMap: {
    READ: {
      description: 'User with read-only access'
    },
    FULL_ACCESS: {
      description: 'User with all permission'
    }
  }
};

registerEnumType(UserRole, userRoleDefinition);

@ObjectType()
export class User {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    username: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  @Field(() => UserRole)
    role: UserRole;

  @HideField()
    password: string;
}
