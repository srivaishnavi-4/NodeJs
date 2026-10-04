const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();


router.post("/", async (req, res) => {

    const session = await mongoose.startSession();

    try {

        const { userId, items } = req.body;

        session.startTransaction();


        // 1. Check user
        const user = await User.findById(userId).session(session);

        if (!user) {
            throw new Error("User not found");
        }


        let totalAmount = 0;

        const orderItems = [];


        // 2. Check products and update stock
        for (const item of items) {

            const product = await Product.findById(
                item.productId
            ).session(session);


            if (!product) {
                throw new Error(
                    `Product ${item.productId} not found`
                );
            }


            if (product.stock < item.quantity) {

                throw new Error(
                    `Insufficient stock for ${product.name}`
                );
            }


            // Calculate item total
            totalAmount +=
                product.price * item.quantity;


            // Store order item
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });


            // Reduce stock
            product.stock -= item.quantity;

            await product.save({
                session
            });
        }


        // 3. Create order
        const order = await Order.create(
            [
                {
                    user: user._id,
                    items: orderItems,
                    totalAmount,
                    status: "PLACED"
                }
            ],
            {
                session
            }
        );


        // 4. Commit transaction
        await session.commitTransaction();


        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: order[0]
        });


    } catch (error) {

        // Rollback everything
        await session.abortTransaction();


        res.status(400).json({
            success: false,
            error: error.message,
            message: "Transaction rolled back"
        });


    } finally {

        session.endSession();
    }
});


module.exports = router;