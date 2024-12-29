import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { Logger } from 'winston';
import { ProductService } from '../service';
import { CreateProductRequest, Filter, Pagination } from '../types';
import { FileStorage } from '../../common/types/storage';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import { AuthRequest, Roles } from '../../common/types';
import { Types } from 'mongoose';
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
        const image = req.files?.imageUrl as UploadedFile;

        // console.log(image,"image");

        const imageName = uuidv4();
        const imageUrl = await this.fileStorage.uploadFile(
            req.files?.imageUrl as UploadedFile,
        );

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
            priceConfiguration: JSON.parse(priceConfiguration),
            attributes: JSON.parse(attributes),
            tenantId,
            categoryId,
            isPublished,
            imageUrl: imageUrl,
        });

        res.status(201).json({
            status: 'success',
            data: createdProduct,
        });
    };

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(
                createHttpError(400, result.array()[0].msg as string, {
                    errors: result.array()[0],
                }),
            );
        }

        const id = req.params.id;
        const existingProduct = await this.productService.findById(id);

        if (!existingProduct) {
            return next(createHttpError(404, 'Product not found'));
        }

        if (!req.auth.roles?.includes(Roles.ADMIN)) {
            //Check if tenant has access to the product
            const tenant = req?.auth.tenantId;
            /*         console.log(req.auth,existingProduct.tenantId,"auth");
             */
            if (existingProduct.tenantId.toString() !== tenant.toString()) {
                return next(
                    createHttpError(
                        403,
                        'You are not authorized to perform this action',
                    ),
                );
            }
        }
        let imageName: string | undefined;
        let uploadedImageUrl: string | undefined;
        let oldImage: string;

        if (req?.files?.imageUrl) {
            const image = req.files?.imageUrl as UploadedFile;
            imageName = uuidv4();
            oldImage = existingProduct.imageUrl;
            uploadedImageUrl = await this.fileStorage.uploadFile(image);
            await this.fileStorage.deleteFile(oldImage);
        }

        const {
            name,
            description,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublished,
        } = req.body;

        const updatedProduct = await this.productService.update(id, {
            name,
            description,
            priceConfiguration: JSON.parse(priceConfiguration as string),
            attributes: JSON.parse(attributes as string),
            tenantId,
            categoryId,
            isPublished,
            imageUrl: uploadedImageUrl ?? existingProduct.imageUrl,
        });

        res.status(200).json({
            status: 'success',
            data: updatedProduct,
        });
    };

    getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { q, tenantId, categoryId, isPublished, page, limit } = req.query;

        console.log(req.auth, 'query');

        const filter: Filter = {};
        const pagination: Pagination = {};
        if (isPublished == 'true') {
            filter.isPublished = true;
        }

        if (tenantId) {
            filter.tenantId = tenantId as string;
        }

        if (categoryId && Types.ObjectId.isValid(categoryId as string)) {
            filter.categoryId = new Types.ObjectId(categoryId as string);
        }

        if (page) {
            pagination.page = parseInt(page as string);
        }

        if (limit) {
            pagination.limit = parseInt(limit as string);
        }

        if (req?.auth?.roles?.includes(Roles.MANAGER)) {
            filter.tenantId = req?.auth?.tenantId;
        }

        const products = await this.productService.findAll(
            filter,
            q as string,
            pagination,
        );
        res.status(200).json({
            status: 'success',
            data: products,
        });
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const product = await this.productService.findById(id);
        if (!product) {
            return next(createHttpError(404, 'Product not found'));
        }
        res.status(200).json({
            status: 'success',
            data: product,
        });
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const existingProduct = await this.productService.findById(id);
        if (!existingProduct) {
            return next(createHttpError(404, 'Product not found'));
        }
        await this.productService.delete(id);
        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully',
        });
    };
}
