import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request in global middleware...`);
  next();
}
