import { body } from 'express-validator';

export default [
    body('name')
        .exists()
        .withMessage('Catrgory name is required')
        .isString()
        .withMessage('Category name must be a string'),
    body('priceConfiguration')
        .exists()
        .withMessage('Price configuration is required'),
    body('priceConfiguration.*.priceType')
        .exists()
        .withMessage('Price type is required')
        .custom((value: 'base' | 'additional') => {
            if (['base', 'additional'].includes(value)) {
                return true;
            } else {
                throw new Error('Price type must be either base or additional');
            }
        })
        .withMessage('Price type must be either base or additional'),
    body('priceConfiguration.*.availableOptions')
        .exists()
        .withMessage('Available options is required')
        .isArray()
        .withMessage('Available options must be an array'),
    body('attributes')
        .exists()
        .withMessage('Attributes is required')
        .isArray()
        .withMessage('Attributes must be an array'),
];
