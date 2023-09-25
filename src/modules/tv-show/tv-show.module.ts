import { Module } from '@nestjs/common';
import { TvShowService } from './tv-show.service';
import { TvShowResolver } from './tv-show.resolver';
import { MovieDataWrapperModule } from '../movie-data-wrapper/movie-data-wrapper.module';

@Module({
  imports: [
    MovieDataWrapperModule
  ],
  providers: [
    TvShowService,
    TvShowResolver
  ]
})
export class TvShowModule {}
