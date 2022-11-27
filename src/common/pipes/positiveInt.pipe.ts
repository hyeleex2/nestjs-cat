// 양수로 반환해주는 파이프
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    console.log('value :', value);
    if (value < 0) {
      throw new HttpException('value> 0', 400);
    }
    return value;
  }
}
