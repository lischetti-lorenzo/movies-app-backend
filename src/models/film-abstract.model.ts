import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class FilmAbstract {
  @Field(() => Int)
    tmdbId: number;

  @Field(() => String)
    overview: string;

  @Field(() => Float)
    popularity: number;

  @Field(() => String, { nullable: true })
    posterPath: string | null;

  @Field(() => Float)
    voteAverage: number;
}
