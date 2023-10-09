import { Injectable } from '@nestjs/common';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';
import { Credit } from '../../models/film-abstract.model';
import { TvShowsList } from '../../models/tv-shows-list.model';
import { TvShow } from '../../models/tv-show.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TvShowService {
  constructor (
    private readonly tmdbDataWrapperService: MovieDataWrapperService,
    private readonly prisma: PrismaService
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

  async getFavoritesTvShows (userId: number, take: number, skip: number): Promise<TvShow[]> {
    const favoritesTvShows = await this.prisma.userFavs.findMany({
      where: {
        userId,
        mediaType: 'TVSHOW'
      },
      take,
      skip
    });

    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const tvShowPromises = favoritesTvShows.map(tvShow => this.tmdbDataWrapperService.getTvShowDetails(tvShow.tmdbId));
    const tvShows = await Promise.all(tvShowPromises);

    return plainToInstance(TvShow, tvShows);
  }

  async getTotalFavoritesTvShows (userId: number): Promise<number> {
    const favoritesTvShows = await this.prisma.userFavs.findMany({
      where: {
        userId,
        mediaType: 'TVSHOW'
      }
    }) ?? [];

    return favoritesTvShows.length;
  }
}
