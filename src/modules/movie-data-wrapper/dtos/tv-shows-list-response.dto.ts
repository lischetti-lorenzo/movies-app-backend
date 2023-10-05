import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { TvShowDto } from '../../tv-show/dtos/tv-show.dto';

export class TvShowsListResponseDto {
  @IsNumber()
  @IsNotEmpty()
    page: number;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => TvShowDto)
    results: TvShowDto[];

  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'total_pages' })
    totalPages: number;
}
