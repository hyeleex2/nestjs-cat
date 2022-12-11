import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}
  async getAllComments() {
    try {
      return await this.commentsModel.find();
    } catch (error) {
      return new BadRequestException(error.massage);
    }
  }

  async createComment(id: string, commentData: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { contents, author } = commentData;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
      const newComments = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComments.save();
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async getCommentsByCatId(id: string | Types.ObjectId) {
    try {
      const comments = await this.commentsModel.find().where({
        author: new mongoose.Types.ObjectId(id),
      });
      return comments;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
