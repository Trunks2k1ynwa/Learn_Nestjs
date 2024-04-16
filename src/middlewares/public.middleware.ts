import { Injectable, NestMiddleware } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NextFunction } from 'express';

@Injectable()
export class PublicMiddleware implements NestMiddleware {
  constructor(private readonly reflector: Reflector) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('🚀 ~ PublicMiddleware:', PublicMiddleware);
    next();
  }

  resolve() {
    return (req, _res, next) => {
      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        req.route.handler,
      );
      if (isPublic) {
        return true;
        // Thêm logic xử lý nếu route được đánh dấu là public
      }
      next();
    };
  }
}
