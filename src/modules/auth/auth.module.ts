import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../config/config.module';
import { ApplicationConfigService } from '../config/application-config.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ApplicationConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExpiration
        }
      }),
      inject: [ApplicationConfigService]
    }),
    PassportModule,
    UserModule,
    AppConfigModule
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
