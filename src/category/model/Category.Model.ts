import { model, Schema } from 'mongoose';

interface PriceConfiguaration {
    [key: string]: {
        priceType: 'base' | 'additional';
        availableOptions: string[];
    };
}

interface Attributes {
    name: string;
    widgetType: 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[];
}

export interface CategoryModel {
    name: string;
    priceConfiguaration: PriceConfiguaration;
    attributes: Attributes[];
}

const PriceConfigurationSchema = new Schema<PriceConfiguaration>({
    priceType: {
        type: String,
        enum: ['base', 'additional'],
        required: true,
    },
    availableOptions: {
        type: [String],
        required: true,
    },
});

const AttributesSchema = new Schema<Attributes>({
    name: {
        type: String,
        required: true,
    },
    widgetType: {
        type: String,
        enum: ['switch', 'radio'],
        required: true,
    },
    defaultValue: {
        type: Schema.Types.Mixed,
        required: true,
    },
    availableOptions: {
        type: [String],
        required: true,
    },
});

const CategorySchema = new Schema<CategoryModel>({
    name: {
        type: String,
        required: true,
    },
    priceConfiguaration: {
        type: Map,
        of: PriceConfigurationSchema,
        required: true,
    },
    attributes: {
        type: [AttributesSchema],
        required: true,
    },
});

export default model<CategoryModel>('Category', CategorySchema);
