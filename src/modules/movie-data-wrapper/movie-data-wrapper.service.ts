import { Injectable } from '@nestjs/common';
import { MovieDataHttpService } from './movie-data-http.service';
import { transformAndValidate } from 'class-transformer-validator';
import { MovieDto } from '../movie/dtos/movie.dto';
import { TvShowDto } from '../tv-show/dtos/tv-show.dto';
import { CreditsDto } from '../../shared/dtos/credits.dto';
import { MoviesListResponseDto } from './dtos/movies-list-response.dto';
import { TvShowsListResponseDto } from './dtos/tv-shows-list-response.dto';

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

  async getPopularMovies (page: number): Promise<MoviesListResponseDto> {
    try {
      const popularMovies = await this.tmdbHttpService
        .getAll<MovieDto>(`${TmdbEndpoints.MOVIES}/popular?page=${page}`);
      return await transformAndValidate(MoviesListResponseDto, popularMovies, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPopularTvShows (page: number): Promise<TvShowsListResponseDto> {
    try {
      const popularTvShows = await this.tmdbHttpService
        .getAll<TvShowDto>(`${TmdbEndpoints.TV_SHOWS}/popular?page=${page}`);
      return await transformAndValidate(TvShowsListResponseDto, popularTvShows, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getMovieCredits (movieId: number): Promise<CreditsDto> {
    try {
      const movieCredits = await this.tmdbHttpService
        .getAll<CreditsDto>(`${TmdbEndpoints.MOVIES}/${movieId}/${TmdbEndpoints.CREDITS}`);
      return await transformAndValidate(CreditsDto, movieCredits, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTvShowCredits (tvShowId: number): Promise<CreditsDto> {
    try {
      const tvShowCredits = await this.tmdbHttpService
        .getAll<CreditsDto>(`${TmdbEndpoints.TV_SHOWS}/${tvShowId}/${TmdbEndpoints.CREDITS}`);
      return await transformAndValidate(CreditsDto, tvShowCredits, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getMovies (query: string, page: number): Promise<MoviesListResponseDto> {
    try {
      const movies = await this.tmdbHttpService
        .getAll<MovieDto>(`search/${TmdbEndpoints.MOVIES}?query=${query}&page=${page}`);
      return await transformAndValidate(MoviesListResponseDto, movies, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTvShows (query: string, page: number): Promise<TvShowsListResponseDto> {
    try {
      const tvShows = await this.tmdbHttpService
        .getAll<TvShowDto>(`search/${TmdbEndpoints.TV_SHOWS}?query=${query}&page=${page}`);
      return await transformAndValidate(TvShowsListResponseDto, tvShows, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getMovieDetails (tmdbMovieId: number): Promise<MovieDto | null> {
    try {
      const movie = await this.tmdbHttpService
        .getOne<MovieDto>(`${TmdbEndpoints.MOVIES}/${tmdbMovieId}`);

      if (movie === null) return null;
      return await transformAndValidate(MovieDto, movie, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTvShowDetails (tmdbTvShowId: number): Promise<TvShowDto | null> {
    try {
      const tvShow = await this.tmdbHttpService
        .getOne<TvShowDto>(`${TmdbEndpoints.TV_SHOWS}/${tmdbTvShowId}`);

      if (tvShow === null) return null;
      return await transformAndValidate(TvShowDto, tvShow, { validator: { whitelist: true } });
    } catch (err) {
      throw new Error(err);
    }
  }
}
