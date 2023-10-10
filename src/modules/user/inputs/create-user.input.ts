import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

const userRoleDefinition = {
  name: 'UserRole',
  description: 'All user roles',
  valuesMap: {
    FULL_ACCESS: {
      description: 'User with all permission'
    },
    READ: {
      description: 'User can only read'
    }
  }
};

registerEnumType(UserRole, userRoleDefinition);

@InputType()
export class CreateUserInput {
  @Field(() => String)
    username: string;

  @Field(() => String)
    password: string;

  @Field(() => String)
    confirmPassword: string;

  @Field(type => UserRole)
    role: UserRole;
}
