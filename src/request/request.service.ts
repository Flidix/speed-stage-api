import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from './schema/request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Project } from '../project/schemas/project.schema';
import { EndPoint } from '../end-point/schemas/end-point.schema';
import { EndPointService } from '../end-point/end-point.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<Request>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(EndPoint.name) private endPointModel: Model<EndPoint>,
    private readonly endPointService: EndPointService,
  ) {}

  async createRequest(dto: CreateRequestDto, projectId: string) {
    if (dto.projectId !== projectId) {
      throw new BadRequestException({ message: 'invalid project id' });
    }
    const { responseTimeInMs, statusCode } = dto;

    const responseTimeInSec = responseTimeInMs / 1000;

    const endPoint = await this.endPointModel.findOne({ name: dto.endPoint, project: projectId });
    if (!endPoint) {
      const newEndPoint = await this.endPointService.createEndPoint(
        dto.endPoint,
        responseTimeInMs,
        responseTimeInSec,
        projectId,
      );
      await newEndPoint.save();
    }

    const createdEndPoint = await this.endPointModel
      .findOne({
        name: dto.endPoint,
        project: projectId,
      })
      .populate('requests');

    if (!createdEndPoint || !createdEndPoint?.requests)
      throw new NotFoundException('something went wrong');

    const request = new this.requestModel({
      responseTimeInMs,
      statusCode,
      responseTimeInSec,
      project: projectId,
      endPoint: createdEndPoint._id,
    });

    const allResponceTime = createdEndPoint.requests.reduce((acc, curr) => {
      return acc + curr.responseTimeInMs;
    }, 0);

    let averageResponseTimeInMs = Math.floor(
      (allResponceTime + responseTimeInMs) / (createdEndPoint.requests.length + 1),
    );

    if (
      isNaN(averageResponseTimeInMs) ||
      averageResponseTimeInMs < 0 ||
      averageResponseTimeInMs === Infinity
    ) {
      averageResponseTimeInMs = responseTimeInMs;
    }

    const averageResponseTimeInSec = (+averageResponseTimeInMs / 1000).toFixed(2);

    await createdEndPoint.updateOne({
      $push: {
        requests: {
          $each: [request._id],
          $position: 0,
        },
      },
      averageResponseTimeInMs,
      averageResponseTimeInSec,
    });
    const newRequest = await request.save();
    return newRequest.populate('project endPoint');
  }
}
