import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  responseTimeInMs: number;

  @IsNotEmpty()
  @IsNumber()
  statusCode: number;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  endPoint: string;
}
