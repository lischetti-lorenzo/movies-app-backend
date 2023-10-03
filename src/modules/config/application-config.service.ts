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

  get origin (): string[] {
    return ['https://studio.apollographql.com', this.configService.get('FRONTEND_URL') as string];
  }

  get tmdbToken (): string {
    return this.configService.get('TMDB_DATA_TOKEN') as string;
  }

  get jwtSecret (): string {
    return this.configService.get('NODE_AUTH_JWT_SECRET') as string;
  }

  get jwtExpiration (): string {
    return this.configService.get('NODE_AUTH_JWT_EXPIRATION') as string;
  }
}
