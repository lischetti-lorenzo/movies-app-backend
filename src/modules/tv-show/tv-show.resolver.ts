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
import { PaginationArgs } from '../../shared/args/pagination.args';
import { Roles } from '../auth/decorators/roles.decorator';

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
    const tvShow = await this.tvShowService.getTvShowById(tmdbTvShowId);
    if (tvShow === null) throw new NotFoundException(`Tv show with id ${tmdbTvShowId} not found`);
    return tvShow;
  }

  @Roles(['FULL_ACCESS'])
  @Query(() => [TvShow], { name: 'favoriteTvShows' })
  async getFavoriteTvShows (
    @CurrentUser() user: User,
      @Args() pagination: PaginationArgs
  ): Promise<TvShow[]> {
    return await this.tvShowService.getFavoritesTvShows(user.id, pagination.take, pagination.skip);
  }

  @Roles(['FULL_ACCESS'])
  @Query(() => Int, { name: 'totalFavoriteTvShows' })
  async getTotalFavoriteTvShows (
    @CurrentUser() user: User
  ): Promise<number> {
    return await this.tvShowService.getTotalFavoritesTvShows(user.id);
  }

  @Roles(['FULL_ACCESS'])
  @Mutation(() => TvShow)
  async likeTvShow (
    @CurrentUser() user: User,
      @Args('tvShowId', { type: () => Int }) tvShowId: number
  ): Promise<TvShow> {
    const result = await this.userFavoriteService.likeItem({
      data: {
        userId: user.id,
        tmdbId: tvShowId,
        mediaType: 'TVSHOW'
      }
    });

    return result as TvShow;
  }

  @Roles(['FULL_ACCESS'])
  @Mutation(() => Int)
  async unlikeTvShow (
    @CurrentUser() user: User,
      @Args('tvShowId', { type: () => Int }) tvShowId: number
  ): Promise<number> {
    return await this.userFavoriteService.unlikeItem({
      where: {
        tmdbId_userId_mediaType: {
          userId: user.id,
          tmdbId: tvShowId,
          mediaType: 'TVSHOW'
        }
      }
    });
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
