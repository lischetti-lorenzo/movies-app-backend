import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { MovieDataWrapperModule } from '../movie-data-wrapper/movie-data-wrapper.module';

@Module({
  imports: [
    MovieDataWrapperModule
  ],
  providers: [
    MovieResolver,
    MovieService
  ]
})
export class MovieModule {}
