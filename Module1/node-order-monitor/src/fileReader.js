const fs = require("node:fs");

function readOrders(filePath, onOrder) {

    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(filePath, {
            encoding: "utf8"
        });

        let buffer = "";

        // Stream emits data whenever a chunk is available
        stream.on("data", chunk => {

            console.log(
                `\nReceived chunk: ${chunk.length} characters`
            );

            buffer += chunk;

            const lines = buffer.split("\n");

            // Keep incomplete line for the next chunk
            buffer = lines.pop();

            for (const line of lines) {

                if (line.trim()) {
                    onOrder(line.trim());
                }
            }
        });

        // Stream emits end when the entire file is read
        stream.on("end", () => {

            // Process the final remaining line
            if (buffer.trim()) {
                onOrder(buffer.trim());
            }

            console.log("\nFile reading completed.");

            resolve();
        });

        // Handle file errors
        stream.on("error", error => {

            reject(error);

        });
    });
}

module.exports = {
    readOrders
};