import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}
  async signUp(body: CatRequestDto) {
    // 데이터 유효성 검사
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException(`해당하는 고양이는 이미 존재합니다.`);
      // throw new HttpException(`해당하는 고양이는 이미 존재합니다.`, 403);
    }
    // password 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // db 저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Array<Express.Multer.File>) {
    const fileName = `cats/${files[0].filename}`;
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    return allCat.map((cat) => cat.readOnlyData);
  }
}
