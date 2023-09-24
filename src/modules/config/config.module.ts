import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationConfigService } from './application-config.service';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate
    })
  ],
  providers: [
    ApplicationConfigService
  ],
  exports: [
    ApplicationConfigService
  ]
})
export class AppConfigModule {}
