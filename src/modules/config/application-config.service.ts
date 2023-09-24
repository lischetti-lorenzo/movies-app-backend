import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApplicationConfigService {
  constructor (private readonly configService: ConfigService) {}

  get applicationPort (): number {
    return this.configService.get('NODE_PORT') as number;
  }

  get tmdbApiUrl (): string {
    return this.configService.get('TMDB_API_BASE_URL') as string;
  }

  get origin (): string {
    return 'https://studio.apollographql.com';
  }

  get tmdbToken (): string {
    return this.configService.get('TMDB_DATA_TOKEN') as string;
  }
}
