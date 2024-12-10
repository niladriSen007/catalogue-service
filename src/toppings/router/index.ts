import express, { RequestHandler } from 'express';
import authentication from '../../middlewares/authentication';
import { isValidRoleMiddleware } from '../../middlewares/isValidRoleMiddleware';
import { requestWrapper } from '../../common/wrapper';
import { ToppingsController } from '../controller';
import { ToppingsService } from '../service';
import fileUpload from 'express-fileupload';
import createHttpError from 'http-errors';
import { CreateToppingsValidator, UpdateToppingsValidator } from '../validation';
import { S3Storage } from '../../common/services/S3Storage';
import { AuthRequest } from '../../common/types';

const router = express.Router();

const toppingService = new ToppingsService();
const s3Storage = new S3Storage();
const toppingController = new ToppingsController(toppingService,s3Storage);

router.post(
    '/',
    authentication as RequestHandler,
    isValidRoleMiddleware(['ADMIN']) as RequestHandler,
    fileUpload({
        limits: { fileSize: 500 * 1024 },
        abortOnLimit: true,
        limitHandler: (req, res, next) => {
            res.status(400).json({
                message: 'File size limit has been reached!',
            });
            next(createHttpError(400, 'File size limit has been reached!'));
        },
    }),
    CreateToppingsValidator,
    requestWrapper(
        async (req, res, next) =>
            await toppingController.create(req, res, next),
    ),
);


router.patch(
    '/:id',
    authentication as RequestHandler,
    isValidRoleMiddleware(['ADMIN', 'MANAGER']) as RequestHandler,
    fileUpload({
        limits: { fileSize: 500 * 1024 },
        abortOnLimit: true,
        limitHandler: (req, res, next) => {
            next(createHttpError(400, 'File size limit has been reached!'));
            res.status(400).json({
                message: 'File size limit has been reached!',
            });
        },
    }),
    UpdateToppingsValidator,
    requestWrapper(
        async (req, res, next) =>
            await toppingController.update(req as AuthRequest, res, next),
    ),
);

router.get(
    '/',
    authentication as RequestHandler,
/*     isValidRoleMiddleware(['ADMIN', 'MANAGER', 'USER']) as RequestHandler,
 */    requestWrapper(
        async (req, res, next) =>
            await toppingController.findAll(req, res, next),
    ),
);


router.get(
    '/:id',
    authentication as RequestHandler,
/*     isValidRoleMiddleware(['ADMIN', 'MANAGER', 'USER']) as RequestHandler,
 */    requestWrapper(
        async (req, res, next) =>
            await toppingController.findById(req, res, next),
    ),
);


router.delete(
    '/:id',
    authentication as RequestHandler,
    isValidRoleMiddleware(['ADMIN']) as RequestHandler,
    requestWrapper(
        async (req, res, next) =>
            await toppingController.delete(req as AuthRequest, res, next),
    ),
);

export default router;
