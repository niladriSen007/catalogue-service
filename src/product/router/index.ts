import express, { RequestHandler } from 'express';
import { ProductController } from '../controller';
import authentication from '../../middlewares/authentication';
import { isValidRoleMiddleware } from '../../middlewares/isValidRoleMiddleware';
import { Roles } from '../../common/types';
import { requestWrapper } from '../../common/wrapper';
import { CreateProductValidator } from '../validator';
import { ProductService } from '../service';
import { logger } from '../../config/logger';
import fileUpload from "express-fileupload"
import { S3Storage } from '../../common/services/S3Storage';
import createHttpError from 'http-errors';


const productService = new ProductService();
const S3Service = new S3Storage();
const productController = new ProductController(productService,logger,S3Service);
const router = express.Router();

router.post(
    '/',
    authentication as RequestHandler,
    isValidRoleMiddleware([Roles.ADMIN]) as RequestHandler,
    fileUpload({
        limits: { fileSize: 500 * 1024 },
        abortOnLimit: true,
        limitHandler: (req, res,next) => {
            next(createHttpError(400, 'File size limit has been reached!'));
            res.status(400).json({ message: 'File size limit has been reached!' });
        }
    }),
    CreateProductValidator,
    requestWrapper(productController.create.bind(productController)),
);

export default router;
