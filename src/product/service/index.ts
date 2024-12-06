import ProductModel from '../model/Product.Model';
import { CreateProduct } from '../types';

export class ProductService {
    create = async (product: CreateProduct) =>
        await ProductModel.create(product);

    findById = async (id: string) => await ProductModel.findById(id);

    update = async (id: string, product: CreateProduct) =>
        await ProductModel.findByIdAndUpdate(id, product, { new: true });
}
