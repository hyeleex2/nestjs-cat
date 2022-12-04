import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      // header로부터 jwt 토큰을 가져옴
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwt 만료 여부
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
      // secretOrKey: jwtConstants.secret,
    });
  }

  // jwt 토큰에 대한 유효성 검증
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException(`접근 오류`);
    }
  }
}
