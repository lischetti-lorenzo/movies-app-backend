import { Resolver, Mutation, ResolveField, Parent, Query, Args, Int } from '@nestjs/graphql';
import { Movie } from '../../models/movie.model';
import { MovieService } from './movie.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Credit } from '../../models/film-abstract.model';
import { MoviesList } from '../../models/movies-list.model';
import { CurrentUser } from '../auth/decorators/auth.decorator';
import { User } from '../../models/user.model';
import { UserFavoriteService } from '../user-favorite/user-favorite.service';
import { PaginationArgs } from '../../shared/args/pagination.args';

@Resolver(() => Movie)
@UseGuards(JwtAuthGuard)
export class MovieResolver {
  constructor (
    private readonly movieService: MovieService,
    private readonly userFavoriteService: UserFavoriteService
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

  @Query(() => Movie, { name: 'movie', nullable: true })
  async getMovie (
    @Args('tmdbMovieId', { type: () => Int }) tmdbMovieId: number
  ): Promise<Movie> {
    const movie = await this.movieService.getMovieById(tmdbMovieId);
    if (movie === null) throw new NotFoundException(`Movie with id ${tmdbMovieId} not found`);
    return movie;
  }

  @Query(() => [Movie], { name: 'favoriteMovies' })
  async getFavoriteMovies (
    @CurrentUser() user: User,
      @Args() pagination: PaginationArgs
  ): Promise<Movie[]> {
    return await this.movieService.getFavoritesMovies(user.id, pagination.take, pagination.skip);
  }

  @Query(() => Int, { name: 'totalFavoriteMovies' })
  async getTotalFavoriteMovies (
    @CurrentUser() user: User,
      @Args() pagination: PaginationArgs
  ): Promise<number> {
    return await this.movieService.getTotalFavoritesMovies(user.id, pagination.take, pagination.skip);
  }

  @Mutation(() => Boolean)
  async likeMovie (
    @CurrentUser() user: User,
      @Args('movieId', { type: () => Int }) movieId: number
  ): Promise<boolean> {
    await this.userFavoriteService.likeItem({
      data: {
        userId: user.id,
        tmdbId: movieId,
        mediaType: 'MOVIE'
      }
    });
    return true;
  }

  @Mutation(() => Boolean)
  async unlikeMovie (
    @CurrentUser() user: User,
      @Args('movieId', { type: () => Int }) movieId: number
  ): Promise<boolean> {
    await this.userFavoriteService.unlikeItem({
      where: {
        tmdbId_userId_mediaType: {
          userId: user.id,
          tmdbId: movieId,
          mediaType: 'MOVIE'
        }
      }
    });
    return true;
  }

  @ResolveField('credit', returns => Credit)
  async getCredits (
    @Parent() movie: Movie
  ): Promise<Credit> {
    return await this.movieService.getMovieCredits(movie.tmdbId);
  }

  @ResolveField('favorite', returns => Boolean)
  async isFavorite (
    @CurrentUser() user: User,
      @Parent() movie: Movie
  ): Promise<boolean> {
    return await this.userFavoriteService.isItemFavorite({
      where: {
        userId: user.id,
        tmdbId: movie.tmdbId,
        mediaType: 'MOVIE'
      }
    });
  }
}
