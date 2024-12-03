import mongoose, { model, Schema } from 'mongoose';

const PriceConfigurationSchema = new Schema({
    priceType: {
        type: String,
        enum: ['base', 'additional'],
    },
    availableOptions: {
        type: Map,
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
        priceConfigurstion: { type: Map, of: PriceConfigurationSchema },
        description: { type: String, required: true },
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

export default model('Product', ProductSchema);
