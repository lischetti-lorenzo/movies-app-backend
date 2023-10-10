import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User, UserWithoutPassword } from '../../models/user.model';
import { LoginResponse } from './dtos/login-response';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../user/inputs/create-user.input';

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

  async signUp (createUserInput: CreateUserInput): Promise<User> {
    const { username, password, confirmPassword, role } = createUserInput;
    const user = await this.userService.findOne({
      where: {
        username
      }
    });

    if (user !== null) {
      throw new Error('User already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords must match');
    }

    const hash = await bcrypt.hash(createUserInput.password, 10);

    return await this.userService.create({
      username,
      password: hash,
      role
    });
  }
}
