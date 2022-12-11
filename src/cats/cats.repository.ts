import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { ReadonlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schema';
@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }
  async existsByEmail(email: string) {
    return await this.catModel.exists({ email });
  }

  async create(cat: CatRequestDto) {
    return await this.catModel.create(cat);
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    // password 필드 제외하고 데이터 가져옴 (보안상의 이유)
    // 가져오고 싶은 필드는 띄어쓰기로 파라미터를 셋팅해서 가져오면 됨
    return await this.catModel.findById(catId).select('-password');
  }

  async findByIdAndUpdateImg(
    id: string,
    fileName: string,
  ): Promise<ReadonlyCatDto | null> {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    // imgUrl 업데이트
    // db에는 file의 폴더 경로를 저장
    const newCat = await cat.save();
    return newCat.readOnlyData;
  }

  async findAll() {
    // const CommentsModel = mongoose.model('Comments', CommentsSchema);
    const result = await this.catModel.find().populate('comments');
    return result;
  }
}
