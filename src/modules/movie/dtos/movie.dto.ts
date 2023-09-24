import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsBoolean()
    adult: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'id' })
    tmdbMovieId: number;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'original_title' })
    originalTitle: string;

  @IsNotEmpty()
  @IsString()
    overview: string;

  @IsNotEmpty()
  @IsNumber()
    popularity: number;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'poster_path' })
    posterPath: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'release_date' })
    releaseDate: string;

  @IsNotEmpty()
  @IsString()
    title: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'vote_average' })
    voteAverage: number;
}
