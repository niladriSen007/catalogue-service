import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import {
    CategoryModel,
    CreateCategoryRequest,
    UpdateCategoryRequest,
} from '../../common/types';
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

    async updateCategory(
        req: UpdateCategoryRequest,
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

        const existingCategory = await this.categoryService.getCategory(
            req.params.id,
        );
        const updatedData = req?.body as Partial<CategoryModel>;
        if (!existingCategory) {
            return next(createHttpError(404, 'Category not found'));
        }

        if (updatedData.priceConfiguration) {
            const existingPriceConfiguration =
                existingCategory.priceConfiguration instanceof Map
                    ? Object.fromEntries(existingCategory.priceConfiguration)
                    : existingCategory.priceConfiguration;

            const updatedPriceConfiguration = {
                ...existingPriceConfiguration,
                ...updatedData.priceConfiguration,
            };

            updatedData.priceConfiguration = updatedPriceConfiguration;
        }

        const updatedCategory = await this.categoryService.updateCategory(
            req.params.id,
            updatedData,
        );
        this.logger.info('Category updated successfully', {
            category: updatedCategory,
        });

        return res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    }

    async getCategory(req: Request, res: Response, next: NextFunction) {
        const category = await this.categoryService.getCategory(
            req?.params?.id,
        );
        return res.status(200).json({
            message: 'Category fetched successfully',
            data: category,
        });
    }

    async getCategories(req: Request, res: Response, next: NextFunction) {
        const categories = await this.categoryService.getCategories();
        return res.status(200).json({
            message: 'Categories fetched successfully',
            data: categories,
        });
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        const category = await this.categoryService.getCategory(req.params.id);
        if (!category) {
            return next(createHttpError(404, 'Category not found'));
        }
        await this.categoryService.deleteCategory(req.params.id);
        this.logger.info('Category deleted successfully', {
            category,
        });

        return res.status(200).json({
            message: 'Category deleted successfully',
        });
    }
}
