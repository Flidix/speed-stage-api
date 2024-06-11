import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Request {
  @Prop()
  responseTimeInMs: number;

  @Prop()
  responseTimeInSec: number;

  @Prop()
  statusCode: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'EndPoint' })
  endPoint: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
