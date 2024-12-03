import { model, Schema } from 'mongoose';
import {
    Attributes,
    CategoryModel,
    PriceConfiguration,
} from '../../common/types';

const PriceConfigurationSchema = new Schema<PriceConfiguration>({
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
    priceConfiguration: {
        type: Map,
        of: PriceConfigurationSchema,
        required: true,
    },
    attributes: {
        type: [AttributesSchema],
        required: true,
    },
},{
    timestamps: true,
});

export default model<CategoryModel>('Category', CategorySchema);
