import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Request, RequestSchema } from './schema/request.schema';
import { Project, ProjectSchema } from '../project/schemas/project.schema';
import { EndPoint, EndPointSchema } from '../end-point/schemas/end-point.schema';
import { EndPointService } from '../end-point/end-point.service';

@Module({
  controllers: [RequestController],
  providers: [RequestService, EndPointService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Request.name,
        schema: RequestSchema,
      },
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
        name: EndPoint.name,
        schema: EndPointSchema,
      },
    ]),
  ],
})
export class RequestModule {}
