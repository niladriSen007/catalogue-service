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

    async updateCategory(id: string, updatedData: Partial<CategoryModelType>) {
        return await CategoryModel.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true },
        );
    }

    async getCategory(id: string) {
        return await CategoryModel.findById(id);
    }

    async getCategories() {
        return await CategoryModel.find();
    }

    async deleteCategory(id: string) {
        return await CategoryModel.findByIdAndDelete(id);
    }
}
