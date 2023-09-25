import { Injectable } from '@nestjs/common';
import { TvShow } from '../../models/tv-show.model';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TvShowService {
  private readonly cls = TvShow;

  constructor (
    private readonly tmdbDataWrapperService: MovieDataWrapperService
  ) {}

  async getPopularTvShows (page: number): Promise<TvShow[]> {
    const popularTvShows = await this.tmdbDataWrapperService.getPopularTvShows(page);
    return plainToInstance(this.cls, popularTvShows);
  }
}
