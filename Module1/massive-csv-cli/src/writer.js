import fs from "node:fs";


// Create a writable stream
export function createOutputStream(outputPath) {

    return fs.createWriteStream(outputPath, {
        encoding: "utf8"
    });

}