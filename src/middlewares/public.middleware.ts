import { Injectable, NestMiddleware } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NextFunction } from 'express';

@Injectable()
export class PublicMiddleware implements NestMiddleware {
  constructor(private readonly reflector: Reflector) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('PublicMiddleware');
    next();
  }
}
