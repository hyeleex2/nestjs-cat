import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// AuthGuard 는 stategy를 자동으로 실행시켜줌
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
