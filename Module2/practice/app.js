const express = require("express");
const dotenv = require("dotenv");

const courseRoutes = require("./routes/courseRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;
const NODE_ENV = process.env.NODE_ENV;
const API_VERSION = process.env.API_VERSION;


// Parse JSON request bodies
app.use(express.json());


// Course routes
app.use(`/api/${API_VERSION}/courses`, courseRoutes);


// Home route
app.get("/", (req, res) => {

    res.status(200).json({
        application: APP_NAME,
        environment: NODE_ENV,
        message: "Course Management API is running"
    });

});


app.listen(PORT, () => {

    console.log(`${APP_NAME} running on port ${PORT}`);

});