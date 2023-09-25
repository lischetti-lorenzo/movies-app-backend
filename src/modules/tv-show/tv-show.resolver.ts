import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TvShow } from '../../models/tv-show.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TvShowService } from './tv-show.service';

@Resolver(() => TvShow)
@UseGuards(JwtAuthGuard)
export class TvShowResolver {
  constructor (
    private readonly tvShowService: TvShowService
  ) {}

  @Query(() => [TvShow], { name: 'popularTvShows' })
  async getPopularTvShows (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number | undefined | null
  ): Promise<TvShow[]> {
    page = page ?? 1;
    return await this.tvShowService.getPopularTvShows(page);
  }

  @Mutation(() => Boolean)
  async likeTvShow (): Promise<boolean> {
    return true;
  }
}
