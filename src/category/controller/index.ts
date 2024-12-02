import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { CreateCategoryRequest } from '../../common/types';
import { CategoryService } from '../service';
import { Logger } from 'winston';

export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly logger: Logger,
    ) {}

    async createCategory(
        req: CreateCategoryRequest,
        res: Response,
        next: NextFunction,
    ) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(
                createHttpError(400, result.array()[0].msg as string, {
                    errors: result.array()[0],
                }),
            );
        }
        const createdCategory = await this.categoryService.createCategory(
            req?.body,
        );
        this.logger.info('Category created successfully', {
            category: createdCategory,
        });

        return res.status(201).json({
            message: 'Category created successfully',
            data: createdCategory,
        });
    }
}
