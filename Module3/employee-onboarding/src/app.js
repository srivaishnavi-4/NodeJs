import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.json());


// API Key Middleware
function apiKeyMiddleware(req, res, next) {

    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: "API key is required"
        });
    }

    if (apiKey !== API_KEY) {
        return res.status(403).json({
            success: false,
            message: "Invalid API key"
        });
    }

    next();
}


// Home route
app.get("/", (req, res) => {

    res.json({
        message: "Employee Onboarding API is running",
        status: "success"
    });

});


// Employee route
app.get("/api/employees", apiKeyMiddleware, (req, res) => {

    res.json({
        success: true,
        message: "Employees fetched successfully",
        employees: [
            {
                id: 1,
                name: "Vaishu",
                department: "IT"
            },
            {
                id: 2,
                name: "Arun",
                department: "HR"
            }
        ]
    });

});


// Route not found
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});


app.listen(PORT, () => {

    console.log(
        `Employee Onboarding API running on port ${PORT}`
    );

});