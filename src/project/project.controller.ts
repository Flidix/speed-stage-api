import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { CurrentProject } from './decorators/current-project.decorator';
import { CheckAuthDto } from './dto/check-auth.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject() {
    return await this.projectService.createProject();
  }

  @Post('auth')
  auth(@Body() dto: CheckAuthDto) {
    return this.projectService.auth(dto.projectId, dto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':projectId')
  async getProject(
    @CurrentProject('projectId') projectIdFromToken: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.projectService.getProject(projectId, projectIdFromToken);
  }
}
