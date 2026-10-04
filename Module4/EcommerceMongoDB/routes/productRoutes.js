const express = require("express");

const Product = require("../models/Product");

const router = express.Router();


// Create product
router.post("/", async (req, res) => {

    try {

        const { name, price, stock } = req.body;

        if (!name || price === undefined || stock === undefined) {

            return res.status(400).json({
                success: false,
                error: "Name, price and stock are required"
            });
        }

        const product = await Product.create({
            name,
            price,
            stock
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Get products
router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


module.exports = router;