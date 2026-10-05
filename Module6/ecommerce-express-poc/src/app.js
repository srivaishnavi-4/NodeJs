const express = require("express");

const productRoutes =
    require("./routes/productRoutes");

const orderRoutes =
    require("./routes/orderRoutes");

const logger =
    require("./middleware/logger");

const {
    notFoundHandler,
    errorHandler
} = require("./middleware/errorHandler");

const app = express();


// Body parser
app.use(express.json());


// Request logger
app.use(logger);


// Health check
app.get("/health", (req, res) => {

    res.status(200).json({
        success: true,
        status: "UP",
        environment: process.env.NODE_ENV,
        processId: process.pid,
        timestamp: new Date().toISOString()
    });

});


// API routes
app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);


// 404 handler
app.use(notFoundHandler);


// Centralized error handler
app.use(errorHandler);


module.exports = app;