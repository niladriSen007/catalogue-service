import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import { CategoryController } from '../controller';
import { CategoryService } from '../service';
import CategoryValidator from '../validator';
import { CreateCategoryRequest } from '../../common/types';
import { logger } from '../../config/logger';
import { requestWrapper } from '../../common/wrapper';
const router = express.Router();

const categoryService = new CategoryService();

const categoryController = new CategoryController(categoryService, logger);

router.post(
    '/',
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
