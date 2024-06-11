import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAuthDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
