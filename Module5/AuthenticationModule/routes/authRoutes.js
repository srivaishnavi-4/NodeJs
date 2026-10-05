const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../data/users");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                errors: [
                    "Name is required",
                    "Email is required",
                    "Password is required"
                ]
            });

        }


        const existingUser =
            users.find(
                user => user.email === email
            );


        if (existingUser) {

            return res.status(409).json({
                success: false,
                error: "Email already registered"
            });

        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = {

            id: users.length + 1,

            name,

            email,

            password: hashedPassword,

            // In a real application,
            // never allow users to make
            // themselves admin.
            role: role === "admin"
                ? "user"
                : "user"

        };


        users.push(user);


        res.status(201).json({

            success: true,

            message: "User registered successfully",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: "Internal Server Error"

        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                success: false,

                error:
                    "Email and password are required"

            });

        }


        const user =
            users.find(
                user => user.email === email
            );


        if (!user) {

            return res.status(401).json({

                success: false,

                error: "Invalid email or password"

            });

        }


        // Compare password with hash
        const passwordMatched =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatched) {

            return res.status(401).json({

                success: false,

                error: "Invalid email or password"

            });

        }


        // Create JWT
        const token =
            jwt.sign(

                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1h"
                }

            );


        res.json({

            success: true,

            message: "Login successful",

            token

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: "Internal Server Error"

        });

    }

});


module.exports = router;