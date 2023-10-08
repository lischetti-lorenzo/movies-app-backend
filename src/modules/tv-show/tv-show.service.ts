import { Injectable } from '@nestjs/common';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';
import { Credit } from '../../models/film-abstract.model';
import { TvShowsList } from '../../models/tv-shows-list.model';
import { TvShow } from '../../models/tv-show.model';

@Injectable()
export class TvShowService {
  constructor (
    private readonly tmdbDataWrapperService: MovieDataWrapperService
  ) {}

  async getPopularTvShows (page: number): Promise<TvShowsList> {
    const popularTvShows = await this.tmdbDataWrapperService.getPopularTvShows(page);
    return plainToInstance(TvShowsList, popularTvShows, { exposeUnsetFields: false });
  }

  async getTvShowCredits (tvShowId: number): Promise<Credit> {
    const tvShowCredits = await this.tmdbDataWrapperService.getTvShowCredits(tvShowId);
    return plainToInstance(Credit, tvShowCredits, { exposeUnsetFields: false });
  }

  async getTvShows (query: string, page: number): Promise<TvShowsList> {
    const tvShows = await this.tmdbDataWrapperService.getTvShows(query, page);
    return plainToInstance(TvShowsList, tvShows, { exposeUnsetFields: false });
  }

  async getTvShowById (tmdbTvShowId: number): Promise<TvShow> {
    const tvShowDetails = await this.tmdbDataWrapperService.getTvShowDetails(tmdbTvShowId);
    return plainToInstance(TvShow, tvShowDetails);
  }
}
