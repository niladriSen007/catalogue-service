import { body } from 'express-validator';

const CreateToppingsValidator = [
    body('name')
        .exists()
        .withMessage('Topping name is required')
        .isString()
        .withMessage('Topping name must be a string'),
    body('imageUrl').custom((value, { req }) => {
        if (!req?.files) throw new Error('Image URL is required');
        return true;
    }),
    body('price').exists().withMessage('Price is required'),
    body('tenantId').exists().withMessage('Tenant is required'),
    body('isPublished').exists().withMessage('isPublished is required'),
];


const UpdateToppingsValidator = [
    body('name')
        .exists()
        .withMessage('Topping name is required')
        .isString()
        .withMessage('Topping name must be a string'),
    body('price').exists().withMessage('Price is required'),
    body('tenantId').exists().withMessage('Tenant is required'),
    body('isPublished').exists().withMessage('isPublished is required'),
];


export { CreateToppingsValidator,UpdateToppingsValidator };
