import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TvShow } from '../../models/tv-show.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TvShowService } from './tv-show.service';
import { Credit } from '../../models/film-abstract.model';

@Resolver(() => TvShow)
@UseGuards(JwtAuthGuard)
export class TvShowResolver {
  constructor (
    private readonly tvShowService: TvShowService
  ) {}

  @Query(() => [TvShow], { name: 'popularTvShows' })
  async getPopularTvShows (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number
  ): Promise<TvShow[]> {
    return await this.tvShowService.getPopularTvShows(page);
  }

  @Query(() => [TvShow], { name: 'tvShows' })
  async getTvShows (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
      @Args('query') query: string
  ): Promise<TvShow[]> {
    return await this.tvShowService.getTvShows(query, page);
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
}
