import { Field, ObjectType } from '@nestjs/graphql';
import { User, UserWithoutPassword } from '../../../models/user.model';

@ObjectType()
export class LoginResponse {
  @Field()
    access_token: string;

  @Field(() => User)
    user: UserWithoutPassword;
}
