import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentProject = createParamDecorator(
  (field: keyof { projectId: string } | undefined, context: ExecutionContext) => {
    const { ctx } = context.switchToHttp().getRequest();

    return field ? ctx[field] : ctx;
  },
);
