import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    // 로그인 시 사용
    JwtModule.register({
      secret: 'secretKey',
      // secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
    // 이렇게 하면 CatsModule에서 export 된 걸 사용할 수 있음
    // forwardRef 를 통해 순환 모듈 참고
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
