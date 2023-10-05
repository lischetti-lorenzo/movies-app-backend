import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from './movie.model';

@ObjectType()
export class MoviesList {
  @Field(() => Int)
    page: number;

  @Field(() => [Movie])
    results: Movie[];

  @Field(() => Int)
    totalPages: number;
}
