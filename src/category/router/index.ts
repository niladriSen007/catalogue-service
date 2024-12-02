import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import { CategoryController } from '../controller';
import { CategoryService } from '../service';
import CategoryValidator from '../validator';

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

router.post('/', CategoryValidator, async (req: Request, res: Response, next: NextFunction) => {
    (await categoryController.createCategory(
        req,
        res,
        next,
    )) as unknown as RequestHandler;
});

export default router;
