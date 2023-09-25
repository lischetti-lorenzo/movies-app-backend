import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './inputs/create-user.input';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly cls = User;

  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (data: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        createdAt: new Date()
      }
    });

    return plainToInstance(this.cls, user);
  }

  async findOne (input: Prisma.UserFindFirstArgs): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        ...input.where,
        deletedAt: null
      }
    }) ?? null;

    return plainToInstance(this.cls, user);
  }
}
