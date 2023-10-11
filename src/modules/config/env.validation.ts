import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  @IsNotEmpty()
    PORT: number;

  @IsString()
  @IsNotEmpty()
    POSTGRES_DB: string;

  @IsNumber()
  @IsNotEmpty()
    POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
    POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
    POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
    DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
    TMDB_API_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
    TMDB_DATA_TOKEN: string;

  @IsString()
  @IsNotEmpty()
    NODE_AUTH_JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
    NODE_AUTH_JWT_EXPIRATION: string;

  @IsString()
  @IsNotEmpty()
    FRONTEND_URL: string;
}

export function validate (
  config: Record<string, unknown>
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  });

  if (errors.length > 0) {
    console.log('Found environment variable issues: ', errors.length);
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
