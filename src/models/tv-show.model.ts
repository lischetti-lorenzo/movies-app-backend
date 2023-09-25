import { Field, ObjectType } from '@nestjs/graphql';
import { FilmAbstract } from './film-abstract.model';

@ObjectType()
export class TvShow extends FilmAbstract {
  @Field(() => String)
    name: string;

  @Field(() => String)
    firstAirDate: string;
}
