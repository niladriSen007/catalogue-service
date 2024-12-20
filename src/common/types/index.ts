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

export interface UpdateCategoryRequest extends Request {
    body: CategoryModel;
}

export interface Cookie {
    accessToken: string;
    refreshToken: string;
}

export enum Roles {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    MANAGER = 'MANAGER',
}

export interface AuthRequest extends Request {
    auth: {
        sub: string;
        roles?: string;
        email?: string;
        id?: number;
        tenantId: string;
    };
}
