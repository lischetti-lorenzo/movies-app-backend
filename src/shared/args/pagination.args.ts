import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
    skip: number = 0;

  @Field(() => Int, { defaultValue: 10 })
  @IsNumber()
  @IsOptional()
  @Max(100)
  @Min(0)
    take: number = 10;
}
