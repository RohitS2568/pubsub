import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'records' })
export class Record extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  inserted_at: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);