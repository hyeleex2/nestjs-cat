import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // 요청 후에 logging
    res.on('finish', () => {
      this.logger.log(req.ip, req.originalUrl, res.statusCode);
    });
    next();
  }
}
