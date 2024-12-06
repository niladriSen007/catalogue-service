import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { Logger } from 'winston';
import { ProductService } from '../service';
import { CreateProductRequest } from '../types';
import { FileStorage } from '../../common/types/storage';
import {v4 as uuidv4} from 'uuid';
import { UploadedFile } from 'express-fileupload';
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly logger: Logger, 
        private readonly fileStorage: FileStorage,
    ) {}
    create = async (
        req: CreateProductRequest,
        res: Response,
        next: NextFunction,
    ) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(
                createHttpError(400, result.array()[0].msg as string, {
                    errors: result.array()[0],
                }),
            );
        }

        //image upload
        const image = req.files?.imageUrl as UploadedFile

        const imageName = uuidv4();
        await this.fileStorage.uploadFile({
            fileName: imageName,
            fileData: image.data.buffer,
        });

        const {
            name,
            description,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublished,
        } = req.body;
        const createdProduct = await this.productService.create({
            name,
            description,
            priceConfiguration : JSON.parse(priceConfiguration),
            attributes : JSON.parse(attributes),
            tenantId,
            categoryId,
            isPublished,
            imageUrl: imageName,
        });

        res.status(201).json({
            status: 'success',
            data: createdProduct,
        });
    };
}
