import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { MovieDataWrapperModule } from '../movie-data-wrapper/movie-data-wrapper.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserFavoriteModule } from '../user-favorite/user-favorite.module';

@Module({
  imports: [
    MovieDataWrapperModule,
    PrismaModule,
    UserFavoriteModule
  ],
  providers: [
    MovieResolver,
    MovieService
  ],
  exports: [
    MovieService
  ]
})
export class MovieModule {}
