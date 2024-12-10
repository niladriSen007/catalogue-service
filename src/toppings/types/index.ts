import { Types } from "mongoose";
import { Request } from "express";

export interface CreateTopping {
  _id?: Types.ObjectId;
  name: string;
  price: number;
  imageUrl: string;
  tenantId: string;
  isPublished: boolean;
}

export interface CreateToppingRequest extends Request {
  body: CreateTopping;
}