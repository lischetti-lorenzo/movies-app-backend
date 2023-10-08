import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { MovieDataWrapperModule } from '../movie-data-wrapper/movie-data-wrapper.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    MovieDataWrapperModule,
    PrismaModule
  ],
  providers: [
    MovieResolver,
    MovieService
  ]
})
export class MovieModule {}
