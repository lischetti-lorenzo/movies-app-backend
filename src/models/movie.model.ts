import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => Boolean)
    adult: boolean;

  @Field(() => Int)
    tmdbMovieId: number;

  @Field(() => String)
    originalTitle: string;

  @Field(() => String)
    overview: string;

  @Field(() => Float)
    popularity: number;

  @Field(() => String)
    posterPath: string;

  @Field(() => String)
    releaseDate: string;

  @Field(() => String)
    title: string;

  @Field(() => Float)
    voteAverage: number;
}
