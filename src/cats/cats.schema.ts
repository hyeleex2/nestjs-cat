import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document, HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'hl.lee@email.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: false,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'hyelee',
    description: 'name',
    required: true,
  })
  @Prop({
    required: false,
  })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Prop()
  imgUrl: string;

  // db에 존재하는 필드가 아님
  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// client에서 보여줄 데이터만 가상으로 필터링해서 나감
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
