const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();


const app = express();

const PORT = process.env.PORT || 3000;


// ======================================================
// BASIC CONFIGURATION
// ======================================================

app.use(express.json());


// ======================================================
// HELMET
// ======================================================

app.use(helmet());


// ======================================================
// CORS
// ======================================================

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


// ======================================================
// LOGIN RATE LIMITER
// ======================================================

const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 5,

    message: {
        message:
            "Too many login attempts. Try again after 15 minutes."
    },

    standardHeaders: true,

    legacyHeaders: false
});


// ======================================================
// DEMO USERS
// ======================================================

const users = [];


// ======================================================
// HOME
// ======================================================

app.get("/", (req, res) => {

    res.json({
        message: "Security POC is running"
    });

});


// ======================================================
// REGISTER
// ======================================================

app.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                message:
                    "Name, email and password are required"
            });

        }


        // Check duplicate email

        const existingUser =
            users.find(user => user.email === email);

        if (existingUser) {

            return res.status(409).json({
                message: "Email already registered"
            });

        }


        // Allow only valid roles

        const allowedRoles = [
            "student",
            "staff",
            "admin"
        ];


        const selectedRole =
            allowedRoles.includes(role)
                ? role
                : "student";


        // ==================================================
        // BCRYPT PASSWORD HASHING
        // ==================================================

        const hashedPassword =
            await bcrypt.hash(password, 12);


        const user = {

            id: users.length + 1,

            name,

            email,

            password: hashedPassword,

            role: selectedRole
        };


        users.push(user);


        res.status(201).json({

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
            message: "Registration failed"
        });

    }

});


// ======================================================
// LOGIN
// ======================================================

app.post(
    "/login",
    loginLimiter,
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;


            if (!email || !password) {

                return res.status(400).json({
                    message:
                        "Email and password are required"
                });

            }


            // Find user

            const user =
                users.find(
                    user => user.email === email
                );


            if (!user) {

                return res.status(401).json({
                    message:
                        "Invalid email or password"
                });

            }


            // ==================================================
            // COMPARE PASSWORD WITH HASH
            // ==================================================

            const passwordMatches =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatches) {

                return res.status(401).json({
                    message:
                        "Invalid email or password"
                });

            }


            // ==================================================
            // CREATE JWT
            // ==================================================

            const token =
                jwt.sign(

                    {
                        userId: user.id,

                        role: user.role
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn:
                            process.env.JWT_EXPIRES_IN
                    }

                );


            res.json({

                message: "Login successful",

                token,

                expiresIn:
                    process.env.JWT_EXPIRES_IN

            });

        } catch (error) {

            res.status(500).json({
                message: "Login failed"
            });

        }

    }
);


// ======================================================
// AUTHENTICATION MIDDLEWARE
// ======================================================

function authenticateToken(req, res, next) {

    const authHeader =
        req.headers.authorization;


    if (!authHeader) {

        return res.status(401).json({
            message:
                "Authorization header is required"
        });

    }


    const parts =
        authHeader.split(" ");


    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {

        return res.status(401).json({
            message:
                "Use: Bearer <token>"
        });

    }


    const token = parts[1];


    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        req.user = decoded;


        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {

            return res.status(401).json({
                message: "Token has expired"
            });

        }


        return res.status(401).json({
            message: "Invalid token"
        });

    }

}


// ======================================================
// RBAC MIDDLEWARE
// ======================================================

function authorizeRoles(...allowedRoles) {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                message: "Authentication required"
            });

        }


        if (
            !allowedRoles.includes(req.user.role)
        ) {

            return res.status(403).json({

                message:
                    "You do not have permission to access this resource"

            });

        }


        next();

    };

}


// ======================================================
// AUTHENTICATED USER
// ======================================================

app.get(
    "/profile",
    authenticateToken,
    (req, res) => {

        res.json({

            message:
                "Authenticated user profile",

            user: req.user

        });

    }
);


// ======================================================
// STUDENT API
// ======================================================

app.get(
    "/student/dashboard",

    authenticateToken,

    authorizeRoles(
        "student",
        "staff",
        "admin"
    ),

    (req, res) => {

        res.json({

            message:
                "Student dashboard",

            userId:
                req.user.userId,

            role:
                req.user.role

        });

    }
);


// ======================================================
// STAFF API
// ======================================================

app.get(
    "/staff/students",

    authenticateToken,

    authorizeRoles(
        "staff",
        "admin"
    ),

    (req, res) => {

        res.json({

            message:
                "Student records accessible",

            accessedBy:
                req.user.role

        });

    }
);


// ======================================================
// ADMIN API
// ======================================================

app.delete(
    "/admin/users/:id",

    authenticateToken,

    authorizeRoles("admin"),

    (req, res) => {

        res.json({

            message:
                "User deleted successfully",

            deletedUserId:
                req.params.id

        });

    }
);


// ======================================================
// SERVER
// ======================================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});