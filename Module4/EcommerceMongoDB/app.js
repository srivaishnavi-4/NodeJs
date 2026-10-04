const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();


// Connect MongoDB
connectDB();


// Middleware
app.use(express.json());


// Home
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "E-commerce API is running"
    });
});


// Routes
app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);


// 404
app.use((req, res) => {

    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.originalUrl} not found`
    });
});


// Start server
app.listen(process.env.PORT || 3000, () => {

    console.log(
        `Server running at http://localhost:${process.env.PORT || 3000}`
    );
});