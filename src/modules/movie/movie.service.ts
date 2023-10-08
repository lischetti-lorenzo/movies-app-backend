import { Injectable, NotFoundException } from '@nestjs/common';
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

  async likeMovie (userId: number, movieId: number): Promise<void> {
    const movie = await this.getMovieById(movieId);
    if (movie === null) throw new NotFoundException(`Movie with id ${movieId} not found`);

    await this.prisma.userFavs.create({
      data: {
        userId,
        mediaType: 'MOVIE',
        tmdbId: movieId
      }
    });
  }

  async unlikeMovie (userId: number, movieId: number): Promise<void> {
    await this.prisma.userFavs.delete({
      where: {
        tmdbId_userId_mediaType: {
          userId,
          mediaType: 'MOVIE',
          tmdbId: movieId
        }
      }
    });
  }
}
