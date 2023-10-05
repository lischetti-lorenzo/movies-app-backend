import { Injectable } from '@nestjs/common';
import { AbstractHttpRequest } from '../../shared/abstract.http.request';
import { HttpService } from '@nestjs/axios';
import { ApplicationConfigService } from '../config/application-config.service';

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

  async getAll<T> (endpoint: string): Promise<T> {
    const response = await super.getMethod<T>(endpoint);
    return response;
  }

  async getOne<T> (endpoint: string): Promise<T> {
    const response = await super.getMethod<T>(endpoint);
    return response;
  }
}
