const mongoose = require("mongoose");

async function connectDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

    } catch (error) {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
}

async function closeDatabase() {

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

}

module.exports = {
    connectDatabase,
    closeDatabase
};