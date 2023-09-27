import { Injectable } from '@nestjs/common';
import { TvShow } from '../../models/tv-show.model';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';
import { Credit } from '../../models/film-abstract.model';

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

  async getTvShowCredits (tvShowId: number): Promise<Credit> {
    const movieCredits = await this.tmdbDataWrapperService.getTvShowCredits(tvShowId);
    return plainToInstance(Credit, movieCredits);
  }

  async getTvShows (query: string, page: number): Promise<TvShow[]> {
    const tvShows = await this.tmdbDataWrapperService.getTvShows(query, page);
    return plainToInstance(this.cls, tvShows);
  }
}
