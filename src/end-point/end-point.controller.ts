import { Controller } from '@nestjs/common';
import { EndPointService } from './end-point.service';

@Controller('end-point')
export class EndPointController {
  constructor(private readonly endPointService: EndPointService) {}
}
