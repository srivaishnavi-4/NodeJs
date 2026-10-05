const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("connect", () => {

    console.log("Connecting to Redis...");

});

redisClient.on("ready", () => {

    console.log("Redis is ready");

});

redisClient.on("error", (error) => {

    console.error(
        "Redis error:",
        error.message
    );

});

async function connectRedis() {

    await redisClient.connect();

}

async function closeRedis() {

    if (redisClient.isOpen) {

        await redisClient.quit();

        console.log("Redis connection closed");

    }

}

module.exports = {
    redisClient,
    connectRedis,
    closeRedis
};