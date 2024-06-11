import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EndPoint } from '../../end-point/schemas/end-point.schema';

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EndPoint' }] })
  endPoints?: EndPoint[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
