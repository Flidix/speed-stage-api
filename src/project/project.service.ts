import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { sign, verify } from 'jsonwebtoken';
import { Environment } from '@shared/variables/environment';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async createProject() {
    const project = await new this.projectModel();

    const { token } = await this.issueAccessToken(project._id.toString());

    await project.save();

    return { projectId: project._id, token };
  }

  async auth(projectId: string, token: string) {
    try {
      const { projectId: projectIdFromToken } = verify(token, Environment.JWT_SECRET);
      if (projectId !== projectIdFromToken) throw new BadRequestException('invalid project id');

      const { token: newToken } = await this.issueAccessToken(projectId);

      return { token: newToken, projectId };
    } catch (e) {
      throw new BadRequestException('invalid credentials');
    }
  }

  async getProject(projectId: string, projectIdFromToken: string) {
    if (projectId !== projectIdFromToken) throw new BadRequestException('invalid project id');
    const project = await this.projectModel
      .findById(projectId)
      .populate({
        path: 'endPoints',
        populate: {
          path: 'requests',
          model: 'Request',
        },
      })
      .exec();

    return project;
  }

  async issueAccessToken(projectId: string) {
    const token = sign({ projectId }, Environment.JWT_SECRET);

    return { token };
  }
}
