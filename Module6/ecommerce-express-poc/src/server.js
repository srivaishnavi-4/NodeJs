require("dotenv").config();

const app = require("./app");

const {
    connectDatabase,
    closeDatabase
} = require("./config/db");

const {
    connectRedis,
    closeRedis
} = require("./config/redis");


const PORT =
    process.env.PORT || 3000;


async function startServer() {

    try {

        // Connect MongoDB
        await connectDatabase();

        // Connect Redis
        await connectRedis();

        // Start Express
        const server =
            app.listen(
                PORT,
                () => {

                    console.log(
                        "================================="
                    );

                    console.log(
                        "E-Commerce API Started"
                    );

                    console.log(
                        `Environment: ${process.env.NODE_ENV}`
                    );

                    console.log(
                        `Port: ${PORT}`
                    );

                    console.log(
                        `Process ID: ${process.pid}`
                    );

                    console.log(
                        "================================="
                    );

                }
            );


        // Graceful shutdown
        const shutdown =
            async (signal) => {

                console.log(
                    `${signal} received`
                );

                console.log(
                    "Shutting down server..."
                );

                server.close(
                    async () => {

                        try {

                            await closeRedis();

                            await closeDatabase();

                            console.log(
                                "Server shutdown completed"
                            );

                            process.exit(0);

                        } catch (error) {

                            console.error(
                                "Shutdown error:",
                                error
                            );

                            process.exit(1);

                        }

                    }
                );

            };


        process.on(
            "SIGTERM",
            () => shutdown("SIGTERM")
        );

        process.on(
            "SIGINT",
            () => shutdown("SIGINT")
        );


    } catch (error) {

        console.error(
            "Server startup failed:",
            error
        );

        process.exit(1);

    }

}


startServer();