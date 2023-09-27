import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TvShowDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'id' })
    tmdbId: number;

  @IsNotEmpty()
  @IsString()
    name: string;

  @IsString()
    overview: string | null;

  @IsNotEmpty()
  @IsNumber()
    popularity: number;

  @IsOptional()
  @IsString()
  @Expose({ name: 'poster_path' })
    posterPath: string | null;

  @IsString()
  @Expose({ name: 'first_air_date' })
    firstAirDate: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'vote_average' })
    voteAverage: number;
}
