import { Query, Args, Int, Resolver, Mutation } from '@nestjs/graphql';
import { Movie } from '../../models/movie.model';
import { MovieService } from './movie.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Movie)
@UseGuards(JwtAuthGuard)
export class MovieResolver {
  constructor (
    private readonly movieService: MovieService
  ) {}

  @Query(() => [Movie], { name: 'popularMovies' })
  async getPopularMovies (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number | undefined | null
  ): Promise<Movie[]> {
    page = page ?? 1;
    return await this.movieService.getPopularMovies(page);
  }

  @Mutation(() => Boolean)
  async likeMovie (): Promise<boolean> {
    return true;
  }
}