import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TvShow } from '../../models/tv-show.model';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TvShowService } from './tv-show.service';
import { Credit } from '../../models/film-abstract.model';
import { TvShowsList } from '../../models/tv-shows-list.model';
import { CurrentUser } from '../auth/decorators/auth.decorator';
import { User } from '@prisma/client';
import { UserFavoriteService } from '../user-favorite/user-favorite.service';

@Resolver(() => TvShow)
@UseGuards(JwtAuthGuard)
export class TvShowResolver {
  constructor (
    private readonly tvShowService: TvShowService,
    private readonly userFavoriteService: UserFavoriteService
  ) {}

  @Query(() => TvShowsList, { name: 'popularTvShows' })
  async getPopularTvShows (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number
  ): Promise<TvShowsList> {
    return await this.tvShowService.getPopularTvShows(page);
  }

  @Query(() => TvShowsList, { name: 'tvShows' })
  async getTvShows (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
      @Args('query') query: string
  ): Promise<TvShowsList> {
    return await this.tvShowService.getTvShows(query, page);
  }

  @Query(() => TvShow, { name: 'tvShow', nullable: true })
  async getTvShow (
    @Args('tmdbTvShowId', { type: () => Int }) tmdbTvShowId: number
  ): Promise<TvShow> {
    const movie = await this.tvShowService.getTvShowById(tmdbTvShowId);
    if (movie === null) throw new NotFoundException(`Movie with id ${tmdbTvShowId} not found`);
    return movie;
  }

  @Mutation(() => Boolean)
  async likeTvShow (): Promise<boolean> {
    return true;
  }

  @ResolveField('credit', returns => Credit)
  async getCredits (
    @Parent() movie: TvShow
  ): Promise<Credit> {
    return await this.tvShowService.getTvShowCredits(movie.tmdbId);
  }

  @ResolveField('favorite', returns => Boolean)
  async isFavorite (
    @CurrentUser() user: User,
      @Parent() tvShow: TvShow
  ): Promise<boolean> {
    return await this.userFavoriteService.isItemFavorite({
      where: {
        userId: user.id,
        tmdbId: tvShow.tmdbId,
        mediaType: 'TVSHOW'
      }
    });
  }
}
