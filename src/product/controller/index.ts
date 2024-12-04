import { Request } from 'express-jwt';
import { NextFunction, Response } from 'express';
export class ProductController {
  create = async (request: Request, response: Response, next: NextFunction) => {
    // create product
  }
}