import express, {
    NextFunction,
    RequestHandler,
    Response
} from 'express';
import { CreateCategoryRequest, Roles } from '../../common/types';
import { requestWrapper } from '../../common/wrapper';
import { logger } from '../../config/logger';
import { CategoryController } from '../controller';
import { CategoryService } from '../service';
import CategoryValidator from '../validator';
import authentication from '../../middlewares/authentication';
import { isValidRoleMiddleware } from '../../middlewares/isValidRoleMiddleware';
const router = express.Router();

const categoryService = new CategoryService();

const categoryController = new CategoryController(categoryService, logger);

router.post(
    '/',
    authentication as RequestHandler,
    isValidRoleMiddleware([Roles.ADMIN,Roles.MANAGER]) as RequestHandler,
    CategoryValidator,
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

export default router;
