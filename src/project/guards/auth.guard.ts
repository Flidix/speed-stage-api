import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtPayload, decode } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies['token'];

    const user = decode(token) as JwtPayload;

    if (!user || typeof user !== 'object') {
      throw new UnauthorizedException({ message: 'unauthorized' });
    }

    req.ctx = user;

    return true;
  }
}
