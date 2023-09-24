import { Injectable } from '@nestjs/common';
import { MovieDataHttpService } from './movie-data-http.service';
import { transformAndValidate } from 'class-transformer-validator';
import { MovieDto } from '../movie/dtos/movie.dto';

enum TmdbEndpoints {
  MOVIES = 'movie'
}

@Injectable()
export class MovieDataWrapperService {
  constructor (
    private readonly tmdbHttpService: MovieDataHttpService
  ) {}

  async getPopularMovies (page: number): Promise<MovieDto[]> {
    try {
      const popularMovies = await this.tmdbHttpService.getAll<MovieDto>(`${TmdbEndpoints.MOVIES}/popular?page=${page}`);
      return await transformAndValidate(MovieDto, popularMovies, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }
}
