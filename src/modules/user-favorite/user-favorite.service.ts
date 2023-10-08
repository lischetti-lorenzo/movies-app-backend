import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieService } from '../movie/movie.service';
import { Prisma } from '@prisma/client';
import { Movie } from '../../models/movie.model';
import { TvShow } from '../../models/tv-show.model';
import { TvShowService } from '../tv-show/tv-show.service';

@Injectable()
export class UserFavoriteService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
    private readonly tvShowService: TvShowService
  ) {}

  async likeItem (args: Prisma.UserFavsCreateArgs): Promise<void> {
    const { data } = args;
    let item: Movie | TvShow | null = null;
    if (data.mediaType === 'MOVIE') item = await this.movieService.getMovieById(data.tmdbId);
    else item = await this.tvShowService.getTvShowById(data.tmdbId);

    if (item === null) throw new NotFoundException(`Item with id ${data.tmdbId} not found`);

    await this.prisma.userFavs.create({ data });
  }

  async unlikeItem (data: Prisma.UserFavsDeleteArgs): Promise<void> {
    await this.prisma.userFavs.delete({
      where: data.where
    });
  }

  async isItemFavorite (data: Prisma.UserFavsFindFirstArgs): Promise<boolean> {
    const item = await this.prisma.userFavs.findFirst({
      where: data.where
    }) ?? null;

    return item !== null;
  }
}
