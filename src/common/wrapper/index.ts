import { NextFunction, RequestHandler,Request,Response } from "express";
import createHttpError from "http-errors";

export const requestWrapper = (requestHandler : RequestHandler) =>{
  return (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(err=>{
      if(err instanceof Error){
        next(createHttpError(500, err.message));
      }
      next(createHttpError(500, 'An unknown error occurred'));
    });
  }
}