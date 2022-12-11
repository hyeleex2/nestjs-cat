import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CommentsCreateDto } from '../dtos/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsServices: CommentsService) {}
  @ApiOperation({
    summary: '모든 고양이 프로필에 적힌 댓글 가져오기',
  })
  @Get('/')
  async getAllComments() {
    return this.commentsServices.getAllComments();
  }

  @ApiOperation({
    summary: '댓글 작성',
  })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsServices.createComment(id, body);
  }

  @ApiOperation({
    summary: '좋아요 수 올리기',
  })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsServices.plusLike(id);
  }

  @Get(':id')
  async getCommentsByCatId(@Param('id') id: string | Types.ObjectId) {
    return this.commentsServices.getCommentsByCatId(id);
  }
}
