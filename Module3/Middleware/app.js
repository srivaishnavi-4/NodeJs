const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");
const {
    notFound,
    errorHandler
} = require("./middleware/errorHandler");


// Parse JSON request body
app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.send("API is running successfully");
});


// User API
app.use("/api/users", userRoutes);


// 404 handler
app.use(notFound);


// Centralized error handler
app.use(errorHandler);


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});