import { Injectable } from '@nestjs/common';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';
import { Credit } from '../../models/film-abstract.model';
import { MoviesList } from '../../models/movies-list.model';
import { Movie } from '../../models/movie.model';

@Injectable()
export class MovieService {
  constructor (
    private readonly tmdbDataWrapperService: MovieDataWrapperService
  ) {}

  async getPopularMovies (page: number): Promise<MoviesList> {
    const popularMovies = await this.tmdbDataWrapperService.getPopularMovies(page);
    return plainToInstance(MoviesList, popularMovies, { exposeUnsetFields: false });
  }

  async getMovieCredits (movieId: number): Promise<Credit> {
    const movieCredits = await this.tmdbDataWrapperService.getMovieCredits(movieId);
    return plainToInstance(Credit, movieCredits);
  }

  async getMovies (query: string, page: number): Promise<MoviesList> {
    const movies = await this.tmdbDataWrapperService.getMovies(query, page);
    return plainToInstance(MoviesList, movies, { exposeUnsetFields: false });
  }

  async getMovieById (tmdbMovieId: number): Promise<Movie> {
    const movieDetails = await this.tmdbDataWrapperService.getMovieDetails(tmdbMovieId);
    return plainToInstance(Movie, movieDetails);
  }
}
