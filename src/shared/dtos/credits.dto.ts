import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class CastDto {
  @IsNotEmpty()
  @IsNumber()
    id: number;

  @IsOptional()
  @IsString()
    name: string;

  @IsOptional()
  @IsString()
    character: string;

  @IsNotEmpty()
  @IsNumber()
    order: number;

  @IsOptional()
  @IsString()
  @Expose({ name: 'profile_path' })
    profilePath: string;
}

class CrewDto {
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsNotEmpty()
  @IsString()
    job: string;
}

export class CreditsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CrewDto)
    crew: CrewDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CastDto)
    cast: CastDto[];
}
