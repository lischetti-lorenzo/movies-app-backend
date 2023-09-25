import { Field, ObjectType } from '@nestjs/graphql';
import { FilmAbstract } from './film-abstract.model';

@ObjectType()
export class Movie extends FilmAbstract {
  @Field(() => Boolean)
    adult: boolean;

  @Field(() => String)
    originalTitle: string;

  @Field(() => String)
    releaseDate: string;

  @Field(() => String)
    title: string;
}
