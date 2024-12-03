import { body, param } from 'express-validator';

const CreateCategoryValidator = [
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

const UpdateCategoryValidator = [
    param('id')
        .exists()
        .withMessage('Category id is required')
        .isMongoId()
        .withMessage('Category id must be a valid mongo id'),
    body().custom((value: Record<string, string>) => {
        if (Object.keys(value).length === 0) {
            throw new Error('Please provide at least one field to update');
        }
        return true;
    }),
    body('name')
        .optional()
        .isString()
        .withMessage('Category name must be a string')
        .trim()
        .notEmpty()
        .withMessage('Category name is required'),
    body('priceConfiguration')
        .optional()
        .custom((value: Record<string, string>) => {
            if (typeof value !== 'object' || value === null) {
                throw new Error('Please provide at least one field to update');
            }
            return true;
        }),
    body('priceConfiguration.*.priceType')
        .optional()
        .custom((value: 'base' | 'additional') => {
            if (['base', 'additional'].includes(value)) {
                return true;
            } else {
                throw new Error('Price type must be either base or additional');
            }
        })
        .withMessage('Price type must be either base or additional'),
    body('priceConfiguration.*.availableOptions')
        .optional()
        .isArray()
        .withMessage('Available options must be an array')
        .custom((value: string[]) => {
            if (
                value.length === 0 ||
                !value.every(
                    (option) =>
                        typeof option === 'string' && option.trim().length > 0,
                )
            ) {
                throw new Error('At least one available option is required');
            }
            return true;
        }),
    body('attributes')
        .optional()
        .isArray()
        .withMessage('Attributes must be an array'),

    body('attributes.*.name')
        .optional()
        .isString()
        .withMessage('Attribute name must be a string')
        .trim()
        .notEmpty()
        .withMessage('Attribute name is required'),
    body('attributes.*.widgetType')
        .optional()
        .custom((value: 'switch' | 'radio') => {
            if (['switch', 'radio'].includes(value)) {
                return true;
            } else {
                throw new Error(
                    'Widget type must be either input, select, radio or checkbox',
                );
            }
        }),
    body('attributes.*.defaultValue')
        .optional()
        .notEmpty()
        .withMessage('Default value is required'),
    body('attributes.*.availableOptions')
        .optional()
        .isArray()
        .withMessage('Options must be an array')
        .custom((value: string[]) => {
            if (
                value.length === 0 ||
                !value.every(
                    (option) =>
                        typeof option === 'string' && option.trim().length > 0,
                )
            ) {
                throw new Error('At least one option is required');
            }
            return true;
        }),
];

export { CreateCategoryValidator, UpdateCategoryValidator };
