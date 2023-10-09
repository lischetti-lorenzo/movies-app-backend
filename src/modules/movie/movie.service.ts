import { Injectable } from '@nestjs/common';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';
import { Credit } from '../../models/film-abstract.model';
import { MoviesList } from '../../models/movies-list.model';
import { Movie } from '../../models/movie.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor (
    private readonly tmdbDataWrapperService: MovieDataWrapperService,
    private readonly prisma: PrismaService
  ) {}

  async getPopularMovies (page: number): Promise<MoviesList> {
    const popularMovies = await this.tmdbDataWrapperService.getPopularMovies(page);
    return plainToInstance(MoviesList, popularMovies, { exposeUnsetFields: false });
  }

  async getMovieCredits (movieId: number): Promise<Credit> {
    const movieCredits = await this.tmdbDataWrapperService.getMovieCredits(movieId);
    return plainToInstance(Credit, movieCredits, { exposeUnsetFields: false });
  }

  async getMovies (query: string, page: number): Promise<MoviesList> {
    const movies = await this.tmdbDataWrapperService.getMovies(query, page);
    return plainToInstance(MoviesList, movies, { exposeUnsetFields: false });
  }

  async getMovieById (tmdbMovieId: number): Promise<Movie> {
    const movieDetails = await this.tmdbDataWrapperService.getMovieDetails(tmdbMovieId);
    return plainToInstance(Movie, movieDetails);
  }

  async getFavoritesMovies (userId: number, take: number, skip: number): Promise<Movie[]> {
    const favoritesMovies = await this.prisma.userFavs.findMany({
      where: {
        userId,
        mediaType: 'MOVIE'
      },
      take,
      skip
    });

    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const moviesPromises = favoritesMovies.map(movie => this.tmdbDataWrapperService.getMovieDetails(movie.tmdbId));
    const movies = await Promise.all(moviesPromises);

    return plainToInstance(Movie, movies);
  }

  async getTotalFavoritesMovies (userId: number): Promise<number> {
    const favoritesMovies = await this.prisma.userFavs.findMany({
      where: {
        userId,
        mediaType: 'MOVIE'
      }
    }) ?? [];

    return favoritesMovies.length;
  }
}
