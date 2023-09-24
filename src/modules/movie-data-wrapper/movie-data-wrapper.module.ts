import { Module } from '@nestjs/common';
import { MovieDataWrapperService } from './movie-data-wrapper.service';
import { MovieDataHttpService } from './movie-data-http.service';
import { HttpModule } from '@nestjs/axios';
import { AppConfigModule } from '../config/config.module';

@Module({
  imports: [
    HttpModule,
    AppConfigModule
  ],
  providers: [
    MovieDataWrapperService,
    MovieDataHttpService
  ],
  exports: [
    MovieDataWrapperService
  ]
})
export class MovieDataWrapperModule {}
