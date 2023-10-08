import { Resolver, Mutation, ResolveField, Parent, Query, Args, Int } from '@nestjs/graphql';
import { Movie } from '../../models/movie.model';
import { MovieService } from './movie.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Credit } from '../../models/film-abstract.model';
import { MoviesList } from '../../models/movies-list.model';

@Resolver(() => Movie)
@UseGuards(JwtAuthGuard)
export class MovieResolver {
  constructor (
    private readonly movieService: MovieService
  ) {}

  @Query(() => MoviesList, { name: 'popularMovies' })
  async getPopularMovies (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number
  ): Promise<MoviesList> {
    return await this.movieService.getPopularMovies(page);
  }

  @Query(() => MoviesList, { name: 'movies' })
  async getMovies (
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
      @Args('query') query: string
  ): Promise<MoviesList> {
    return await this.movieService.getMovies(query, page);
  }

  @Query(() => Movie, { name: 'movie' })
  async getMovie (
    @Args('tmdbMovieId', { type: () => Int }) tmdbMovieId: number
  ): Promise<Movie> {
    return await this.movieService.getMovieById(tmdbMovieId);
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
