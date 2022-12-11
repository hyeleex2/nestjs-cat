import { PickType } from '@nestjs/swagger';
import { Comments } from '../comments.schema';

// 실제 req에서 사용해야 하는 것들..
export class CommentsCreateDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
