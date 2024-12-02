import { NextFunction, Request,Response } from 'express';
import { CategoryService } from '../service';

export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ){}

    createCategory(req:Request, res : Response,next:NextFunction) {
      setTimeout(() => {
      res.send('Hello from category controller');
      },2000);
    }
}