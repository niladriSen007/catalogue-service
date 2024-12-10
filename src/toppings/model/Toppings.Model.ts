import { model, Schema } from 'mongoose';

const ToppingsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        tenantId: { type: String, required: true },
        isPublished: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export default model('Toppings', ToppingsSchema);
