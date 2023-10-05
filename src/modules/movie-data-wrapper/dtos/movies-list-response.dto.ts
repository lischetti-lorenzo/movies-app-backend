import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { MovieDto } from '../../movie/dtos/movie.dto';
import 'reflect-metadata';

export class MoviesListResponseDto {
  @IsNumber()
  @IsNotEmpty()
    page: number;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => MovieDto)
    results: MovieDto[];

  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'total_pages' })
    totalPages: number;
}
