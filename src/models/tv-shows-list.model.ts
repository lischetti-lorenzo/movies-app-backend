import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TvShow } from './tv-show.model';

@ObjectType()
export class TvShowsList {
  @Field(() => Int)
    page: number;

  @Field(() => [TvShow])
    results: TvShow[];

  @Field(() => Int)
    totalPages: number;
}
