import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

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

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    // password 필드 제외하고 데이터 가져옴 (보안상의 이유)
    // 가져오고 싶은 필드는 띄어쓰기로 파라미터를 셋팅해서 가져오면 됨
    return await this.catModel.findById(catId).select('-password');
  }
}
