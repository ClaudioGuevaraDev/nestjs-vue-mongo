import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Task {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USer',
  })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
