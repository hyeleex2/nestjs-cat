import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    // map()의 파라미터로 들어오는 data : 컨트롤러에서 return한 값이 들어옴
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
