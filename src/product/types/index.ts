import { Request } from 'express-jwt';
import mongoose from 'mongoose';

export interface CreateProduct {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    priceConfiguration: string;
    /* priceConfiguration: Map<
        string,
        {
            priceType: string;
            availableOptions: Map<string, number>;
        }
    >; */
    imageUrl: string;
    attributes: string;
   /*  attributes: Array<{
        name: string;
        value: mongoose.Schema.Types.Mixed;
    }>; */
    tenantId: string | mongoose.Types.ObjectId;
    categoryId: string | mongoose.Types.ObjectId;
    isPublished: boolean;
}


export interface CreateProductRequest extends Request{
    body: CreateProduct;
}