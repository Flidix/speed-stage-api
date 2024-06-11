import { Injectable } from '@nestjs/common';
import { EndPoint } from './schemas/end-point.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../project/schemas/project.schema';

@Injectable()
export class EndPointService {
  constructor(
    @InjectModel(EndPoint.name) private endPointModel: Model<EndPoint>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createEndPoint(
    name: string,
    averageResponseTimeInMs: number,
    averageResponseTimeInSec: number,
    projectId: string,
  ) {
    const project = await this.projectModel.findById(projectId);
    const endPoint = new this.endPointModel({
      name,
      averageResponseTimeInMs,
      averageResponseTimeInSec,
      project: projectId,
    });

    await project?.updateOne({
      $push: {
        endPoints: {
          $each: [endPoint._id],
          $position: 0,
        },
      },
    });

    return endPoint.save();
  }
}
