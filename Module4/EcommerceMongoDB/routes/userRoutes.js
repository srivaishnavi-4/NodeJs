const express = require("express");

const User = require("../models/User");

const router = express.Router();


// Create user
router.post("/", async (req, res) => {

    try {

        const { name, email } = req.body;

        if (!name || !email) {

            return res.status(400).json({
                success: false,
                errors: [
                    "Name is required",
                    "Email is required"
                ]
            });
        }

        const user = await User.create({
            name,
            email
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Get users
router.get("/", async (req, res) => {

    try {

        const users = await User.find();

        res.json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


module.exports = router;