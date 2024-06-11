import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { CurrentProject } from '../project/decorators/current-project.decorator';
import { CreateRequestDto } from './dtos/create-request.dto';
import { HeadersJwtAuthGuard } from '../project/guards/headers.auth.guard';

@UseGuards(HeadersJwtAuthGuard)
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async createRequest(
    @Body() dto: CreateRequestDto,
    @CurrentProject('projectId') projectId: string,
  ) {
    return await this.requestService.createRequest(dto, projectId);
  }
}
