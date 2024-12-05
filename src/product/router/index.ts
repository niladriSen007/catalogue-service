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


const productService = new ProductService();
const productController = new ProductController(productService,logger);
const router = express.Router();

router.post(
    '/',
    authentication as RequestHandler,
    isValidRoleMiddleware([Roles.ADMIN]) as RequestHandler,
    fileUpload(),
    CreateProductValidator,
    requestWrapper(productController.create.bind(productController)),
);

export default router;
