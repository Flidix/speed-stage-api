import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Environment } from '@shared/variables/environment';
import { ProjectModule } from './project/project.module';
import { EndPointModule } from './end-point/end-point.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [MongooseModule.forRoot(Environment.MONGODB_URL), ProjectModule, EndPointModule, RequestModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
