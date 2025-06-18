import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Capital "P" matches your Product model
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Make sure your User model is registered with lowercase 'user'
        required: true
    }
}, {
    timestamps: true
});

const CartProductModel = mongoose.model('cartProduct', cartProductSchema);

export default CartProductModel;
