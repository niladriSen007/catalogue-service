import { NextFunction, Response,Request } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { Logger } from 'winston';
import { ProductService } from '../service';
import { CreateProductRequest } from '../types';
import { FileStorage } from '../../common/types/storage';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import { AuthRequest, Roles } from '../../common/types';
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
            priceConfiguration: JSON.parse(priceConfiguration),
            attributes: JSON.parse(attributes),
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

    update = async ( req: AuthRequest, res: Response, next: NextFunction) => {
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

        if(!existingProduct){
            return next(createHttpError(404, 'Product not found'));
        }

        if(!req.auth.roles?.includes(Roles.ADMIN)){
            //Check if tenant has access to the product
        const tenant = req?.auth.tenantId;
        /*         console.log(req.auth,existingProduct.tenantId,"auth");
         */
                if(existingProduct.tenantId.toString() !== tenant.toString()){
                    return next(createHttpError(403, 'You are not authorized to perform this action'));
                }
        
        }
        let imageName: string | undefined ;
        let oldImage:string;

        if(req?.files?.imageUrl){
            const image = req.files?.imageUrl as UploadedFile;
            imageName = uuidv4();
            oldImage = existingProduct.imageUrl;
            await this.fileStorage.uploadFile({
                fileName: imageName,
                fileData: image.data.buffer,
            });
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


        const updatedProduct = await this.productService.update(id,{
            name,
            description,
            priceConfiguration: JSON.parse(priceConfiguration as string),
            attributes: JSON.parse(attributes as string),
            tenantId,
            categoryId,
            isPublished,
            imageUrl: imageName ?? existingProduct.imageUrl,
        });


       

        res.status(200).json({
            status: 'success',
            data: updatedProduct,
        });
    };
}
