import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import { CreateCategoryRequest, Roles } from '../../common/types';
import { requestWrapper } from '../../common/wrapper';
import { logger } from '../../config/logger';
import { CategoryController } from '../controller';
import { CategoryService } from '../service';

import authentication from '../../middlewares/authentication';
import { isValidRoleMiddleware } from '../../middlewares/isValidRoleMiddleware';
import { CreateCategoryValidator, UpdateCategoryValidator } from '../validator';
const router = express.Router();

const categoryService = new CategoryService();

const categoryController = new CategoryController(categoryService, logger);

router.post(
    '/',
    authentication as RequestHandler,
    isValidRoleMiddleware([Roles.ADMIN]) as RequestHandler,
    CreateCategoryValidator,
    requestWrapper(
        async (
            req: CreateCategoryRequest,
            res: Response,
            next: NextFunction,
        ) => {
            await categoryController.createCategory(req, res, next);
        },
    ),
);

router.patch(
    '/:id',
    authentication as RequestHandler,
    isValidRoleMiddleware([Roles.ADMIN]) as RequestHandler,
    UpdateCategoryValidator,
    requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.updateCategory(req, res, next);
    }),
);

router.get(
    '/:id',
    requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.getCategory(req, res, next);
    }),
);

router.get(
    '/',
    requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.getCategories(req, res, next);
    }),
);

router.delete(
    '/:id',
    authentication as RequestHandler,
    isValidRoleMiddleware([Roles.ADMIN]) as RequestHandler,
    requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.deleteCategory(req, res, next);
    }),
);

export default router;
