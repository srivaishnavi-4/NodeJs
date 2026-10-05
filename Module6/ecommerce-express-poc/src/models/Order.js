const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        totalAmount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "PLACED",
                "CONFIRMED",
                "CANCELLED"
            ],
            default: "PLACED"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);