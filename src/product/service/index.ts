import ProductModel from '../model/Product.Model';
import { CreateProduct, Filter } from '../types';

export class ProductService {
    create = async (product: CreateProduct) =>
        await ProductModel.create(product);

    findById = async (id: string) => await ProductModel.findById(id);

    update = async (id: string, product: CreateProduct) =>
        await ProductModel.findByIdAndUpdate(id, product, { new: true });

    findAll = async (filter: Filter = {}, q: string = '') =>{

        const searchQueryRegex = new RegExp(q, 'i');
        const query = {
            ...filter,
            name: searchQueryRegex
        };

        const aggregaetProducts =  ProductModel.aggregate([
            {
                $match:query
            },
            {
                $lookup:{
                    from:'categories',
                    localField:'categoryId',
                    foreignField:'_id',
                    as:'category',
                    pipeline:[
                        {
                            $project:{
                                _id:1,
                                name:1,
                                attributes:1,
                                priceConfiguration:1
                            }
                        }
                    ]
                }
            },
            {
                $unwind:'$category'
            },
           
        ])

        const products = await aggregaetProducts.exec();
        return products as CreateProduct[];
    }
}
