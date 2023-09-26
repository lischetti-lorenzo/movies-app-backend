import { Injectable } from '@nestjs/common';
import { MovieDataHttpService } from './movie-data-http.service';
import { transformAndValidate } from 'class-transformer-validator';
import { MovieDto } from '../movie/dtos/movie.dto';
import { TvShowDto } from '../tv-show/dtos/tv-show.dto';
import { CreditsDto } from '../../shared/dtos/credits.dto';

enum TmdbEndpoints {
  MOVIES = 'movie',
  TV_SHOWS = 'tv',
  CREDITS = 'credits'
}

@Injectable()
export class MovieDataWrapperService {
  constructor (
    private readonly tmdbHttpService: MovieDataHttpService
  ) {}

  async getPopularMovies (page: number): Promise<MovieDto[]> {
    try {
      const popularMovies = await this.tmdbHttpService
        .getAll<MovieDto>(`${TmdbEndpoints.MOVIES}/popular?page=${page}`);
      return await transformAndValidate(MovieDto, popularMovies, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPopularTvShows (page: number): Promise<TvShowDto[]> {
    try {
      const popularTvShows = await this.tmdbHttpService
        .getAll<TvShowDto>(`${TmdbEndpoints.TV_SHOWS}/popular?page=${page}`);
      return await transformAndValidate(TvShowDto, popularTvShows, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getMovieCredits (movieId: number): Promise<CreditsDto> {
    try {
      const movieCredits = await this.tmdbHttpService
        .getOne<CreditsDto>(`${TmdbEndpoints.MOVIES}/${movieId}/${TmdbEndpoints.CREDITS}`);
      return await transformAndValidate(CreditsDto, movieCredits, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTvShowCredits (tvShowId: number): Promise<CreditsDto> {
    try {
      const tvShowCredits = await this.tmdbHttpService
        .getOne<CreditsDto>(`${TmdbEndpoints.TV_SHOWS}/${tvShowId}/${TmdbEndpoints.CREDITS}`);
      return await transformAndValidate(CreditsDto, tvShowCredits, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }
}
