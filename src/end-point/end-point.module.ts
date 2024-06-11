import { Module } from '@nestjs/common';
import { EndPointService } from './end-point.service';
import { EndPointController } from './end-point.controller';
import { EndPoint, EndPointSchema } from './schemas/end-point.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../project/schemas/project.schema';

@Module({
  controllers: [EndPointController],
  providers: [EndPointService],
  imports: [
    MongooseModule.forFeature([
      {
        name: EndPoint.name,
        schema: EndPointSchema,
      },
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
})
export class EndPointModule {}
