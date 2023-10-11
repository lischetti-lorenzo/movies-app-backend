import { Module, forwardRef } from '@nestjs/common';
import { TvShowService } from './tv-show.service';
import { TvShowResolver } from './tv-show.resolver';
import { MovieDataWrapperModule } from '../movie-data-wrapper/movie-data-wrapper.module';
import { UserFavoriteModule } from '../user-favorite/user-favorite.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MovieDataWrapperModule,
    forwardRef(() => UserFavoriteModule),
    PrismaModule,
    UserModule
  ],
  providers: [
    TvShowService,
    TvShowResolver
  ],
  exports: [
    TvShowService
  ]
})
export class TvShowModule {}
