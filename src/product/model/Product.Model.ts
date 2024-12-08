import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoose, { model, Schema } from 'mongoose';

const PriceConfigurationSchema = new Schema({
    priceType: {
        type: String,
        enum: ['base', 'additional'],
    },
    availableOptions: {
        type: Map<string, number>,
        of: Number,
    },
});

const AttributesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Schema.Types.Mixed,
    },
});

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        priceConfiguration: { type: Map, of: PriceConfigurationSchema },
        imageUrl: { type: String, required: true },
        attributes: [AttributesSchema],
        tenantId: { type: String, required: true },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
        isPublished: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

ProductSchema.plugin(aggregatePaginate);

export default model('Product', ProductSchema);
