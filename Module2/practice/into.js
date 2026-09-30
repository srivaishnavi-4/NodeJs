const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {

    res.json({
        message: "Server is running",
        application: process.env.APP_NAME,
        environment: process.env.NODE_ENV
    });

});

app.listen(PORT, () => {

    console.log(`${process.env.APP_NAME} running on ${PORT}`);

});