import { CategoryModel as CategoryModelType } from '../../common/types';
import CategoryModel from '../model/Category.Model';

export class CategoryService {
    constructor() {}

    async createCategory({
        name,
        attributes,
        priceConfiguration,
    }: CategoryModelType) {
        const category = new CategoryModel({
            name,
            attributes,
            priceConfiguration,
        });
        return await category.save();
    }
}
