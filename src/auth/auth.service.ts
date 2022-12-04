import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // auth 모듈의 jwtmodule에서 제공해줌

@Injectable()
export class AuthService {
  // login
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    // 해당하는 email이 있는지 체크
    const cat = await this.catsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException(`이메일과 비밀번호를 확인해주세요`);
    }

    // password 체크
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException(`비밀번호를 확인해주세요.`);
    }

    // jwt 생성
    const payload = { email, sub: cat.id };

    // jwt 반환
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
