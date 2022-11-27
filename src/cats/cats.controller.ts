import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  getAllCat() {
    return 'all cat';
  }

  @Get(':id')
  // param 으로 들어오는 string 타입을 int로 변경 & validation 체크
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }
  @Patch(':id')
  updatePartialCat() {
    return 'patch cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
