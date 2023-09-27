import { Injectable } from '@nestjs/common';
import { Movie } from '../../models/movie.model';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';
import { Credit } from '../../models/film-abstract.model';

@Injectable()
export class MovieService {
  private readonly cls = Movie;

  constructor (
    private readonly tmdbDataWrapperService: MovieDataWrapperService
  ) {}

  async getPopularMovies (page: number): Promise<Movie[]> {
    const popularMovies = await this.tmdbDataWrapperService.getPopularMovies(page);
    return plainToInstance(this.cls, popularMovies);
  }

  async getMovieCredits (movieId: number): Promise<Credit> {
    const movieCredits = await this.tmdbDataWrapperService.getMovieCredits(movieId);
    return plainToInstance(Credit, movieCredits);
  }

  async getMovies (query: string, page: number): Promise<Movie[]> {
    const movies = await this.tmdbDataWrapperService.getMovies(query, page);
    return plainToInstance(this.cls, movies);
  }
}
