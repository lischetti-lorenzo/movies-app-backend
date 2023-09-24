import { Injectable } from '@nestjs/common';
import { Movie } from '../../models/movie.model';
import { MovieDataWrapperService } from '../movie-data-wrapper/movie-data-wrapper.service';
import { plainToInstance } from 'class-transformer';

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
}
