import { Module, forwardRef } from '@nestjs/common';
import { UserFavoriteService } from './user-favorite.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { MovieModule } from '../movie/movie.module';
import { TvShowModule } from '../tv-show/tv-show.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => MovieModule),
    TvShowModule
  ],
  providers: [
    UserFavoriteService
  ],
  exports: [
    UserFavoriteService
  ]
})
export class UserFavoriteModule {}
