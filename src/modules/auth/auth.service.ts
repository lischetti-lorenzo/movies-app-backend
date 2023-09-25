import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User, UserWithoutPassword } from '../../models/user.model';
import { LoginResponse } from './dtos/login-response';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './inputs/login-input';

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser (
    username: string,
    password: string
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findOne({
      where: { username }
    });

    if (user === null) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login (user: UserWithoutPassword): Promise<LoginResponse> {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id
      }),
      user
    };
  }

  async signUp (loginUserInput: LoginUserInput): Promise<User> {
    const user = await this.userService.findOne({
      where: {
        username: loginUserInput.username
      }
    });

    if (user !== null) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);

    return await this.userService.create({
      username: loginUserInput.username,
      password
    });
  }
}
