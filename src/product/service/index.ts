import ProductModel from "../model/Product.Model";
import { CreateProduct } from "../types";

export class ProductService{

  create = async (product: CreateProduct) => await ProductModel.create(product);
  
}