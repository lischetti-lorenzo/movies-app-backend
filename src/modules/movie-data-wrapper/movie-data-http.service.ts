import { Injectable } from '@nestjs/common';
import { AbstractHttpRequest } from '../../shared/abstract.http.request';
import { HttpService } from '@nestjs/axios';
import { ApplicationConfigService } from '../config/application-config.service';

interface ListResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

@Injectable()
export class MovieDataHttpService extends AbstractHttpRequest {
  constructor (
    protected readonly httpService: HttpService,
    protected readonly applicationConfigService: ApplicationConfigService
  ) {
    super(httpService, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${applicationConfigService.tmdbToken}`
      }
    }, applicationConfigService.tmdbApiUrl);
  }

  async getAll<T> (endpoint: string): Promise<T[]> {
    const response = await super.getMethod<ListResponse<T>>(endpoint);
    return response.results;
  }
}
