import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsBoolean()
    adult: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'id' })
    tmdbId: number;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'original_title' })
    originalTitle: string;

  @IsString()
    overview: string;

  @IsNotEmpty()
  @IsNumber()
    popularity: number;

  @IsOptional()
  @IsString()
  @Expose({ name: 'poster_path' })
    posterPath: string;

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
