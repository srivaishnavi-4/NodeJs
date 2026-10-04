const express = require("express");

const router = express.Router();

const validateUser = require("../middleware/validateUser");


// GET users
router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Users fetched successfully"
    });
});


// POST user
router.post("/", validateUser, (req, res,next) => {

    const { name, email, dob } = req.body;

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
            name,
            email,
            dob
        }
    });
    next();
});


// Test 500 error
router.get("/error", (req, res, next) => {

    const error = new Error("Something went wrong");

    error.statusCode = 500;

    next(error);
});


module.exports = router;