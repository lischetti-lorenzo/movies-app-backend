import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

export type UserWithoutPassword = Omit<User, 'password'>;

@ObjectType()
export class User {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    username: string;

  @HideField()
    password: string;
}
