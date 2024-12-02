import { Request } from 'express';
export interface PriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'additional';
        availableOptions: string[];
    };
}

export interface Attributes {
    name: string;
    widgetType: 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[];
}

export interface CategoryModel {
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attributes[];
}

export interface CreateCategoryRequest extends Request {
    body: CategoryModel;
}
