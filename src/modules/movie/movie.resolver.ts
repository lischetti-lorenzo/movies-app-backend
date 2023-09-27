import { Query, Args, Int, Resolver, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Movie } from '../../models/movie.model';
import { MovieService } from './movie.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Credit } from '../../models/film-abstract.model';

@Resolver(() => Movie)
@UseGuards(JwtAuthGuard)
export class MovieResolver {
  constructor (
    private readonly movieService: MovieService
  ) {}

  @Query(() => [Movie], { name: 'popularMovies' })
  async getPopularMovies (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number
  ): Promise<Movie[]> {
    return await this.movieService.getPopularMovies(page);
  }

  @Query(() => [Movie], { name: 'movies' })
  async getMovies (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
      @Args('query') query: string
  ): Promise<Movie[]> {
    return await this.movieService.getMovies(query, page);
  }

  @Mutation(() => Boolean)
  async likeMovie (): Promise<boolean> {
    return true;
  }

  @ResolveField('credit', returns => Credit)
  async getCredits (
    @Parent() movie: Movie
  ): Promise<Credit> {
    return await this.movieService.getMovieCredits(movie.tmdbId);
  }
}
