import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document, HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: false,
  })
  @IsNotEmpty()
  password: string;

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
