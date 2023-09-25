import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ApplicationConfigService } from '../../config/application-config.service';

export interface JwtResponse {
  userId: number
  username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly applicationConfigService: ApplicationConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: applicationConfigService.jwtSecret
    });
  }

  validate (payload: any): JwtResponse {
    // payload is the decoded jwt token
    return {
      userId: payload.sub,
      username: payload.username
    };
  }
}
