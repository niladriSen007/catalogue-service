import express, { RequestHandler } from 'express';
import { ProductController } from '../controller';
import authentication from '../../middlewares/authentication';
import { isValidRoleMiddleware } from '../../middlewares/isValidRoleMiddleware';
import { Roles } from '../../common/types';
import { requestWrapper } from '../../common/wrapper';
import { CreateProductValidator } from '../validator';

const productController = new ProductController();
const router = express.Router();

router.post(
    '/',
    authentication as RequestHandler,
    isValidRoleMiddleware([Roles.ADMIN]) as RequestHandler,
    CreateProductValidator,
    requestWrapper(productController.create.bind(productController)),
);

export default router;
