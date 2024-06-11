import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Request } from '../../request/schema/request.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class EndPoint {
  @Prop()
  name: string;

  @Prop()
  averageResponseTimeInMs: number;

  @Prop()
  averageResponseTimeInSec: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }] })
  requests?: Request[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: string;
}

export const EndPointSchema = SchemaFactory.createForClass(EndPoint);
