import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/login-response';
import { LoginUserInput } from './inputs/login-input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User } from '../../models/user.model';
import { CreateUserInput } from '../user/inputs/create-user.input';

@Resolver()
export class AuthResolver {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login (
    @Args('loginUserInput') loginUserInput: LoginUserInput,
      @Context() context: any
  ): Promise<LoginResponse> {
    return await this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signUp (
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return await this.authService.signUp(createUserInput);
  }
}
