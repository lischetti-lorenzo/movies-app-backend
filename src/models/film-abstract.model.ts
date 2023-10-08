import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Cast {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    name: string;

  @Field(() => String)
    character: string;

  @Field(() => Int)
    order: number;

  @Field(() => String, { nullable: true })
    profilePath: string | null;
}

@ObjectType()
class Crew {
  @Field(() => String)
    name: string;

  @Field(() => String)
    job: string;
}

@ObjectType()
export class Credit {
  @Field(() => [Cast])
    cast: Cast[];

  @Field(() => [Crew])
    crew: Crew[];
}

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

  @Field(() => String, { nullable: true })
    backdropPath: string | null;

  @Field(() => Float)
    voteAverage: number;

  @Field(() => Credit)
    credit: Credit;

  @Field(() => Boolean)
    favorite: boolean;
}
