import { body } from "express-validator";

const CreateProductValidator = [
    body('name')
        .exists()
        .withMessage('Product name is required')
        .isString()
        .withMessage('Product name must be a string'),
    body('description')
        .exists()
        .withMessage('Product description is required'),
    body('priceConfiguration')
        .exists()
        .withMessage('Price configuration is required'),
    body('attributes')
        .exists()
        .withMessage('Tenant is required'),
    body('tenantId')
        .exists()
        .withMessage('Attributes is required'),
    body('categoryId')
        .exists()
        .withMessage('Category is required'),
    body('imageUrl')
        .exists()
        .custom(({ req }) => {
            if (!req?.files) throw new Error('Image URL is required');
            return true;
        })
        .withMessage('Image URL is required'),
];

export {CreateProductValidator}