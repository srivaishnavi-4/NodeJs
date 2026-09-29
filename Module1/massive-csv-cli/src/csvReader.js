import fs from "node:fs";
import readline from "node:readline";

import { createEmployee, matchesFilter } from "./filter.js";
import { appEvents } from "./events.js";


// Process CSV file
export function processCSV(inputPath, outputStream, filters) {

    return new Promise((resolve, reject) => {

        let total = 0;
        let matched = 0;
        let skipped = 0;


        // Read file as a stream
        const fileStream = fs.createReadStream(inputPath, {
            encoding: "utf8"
        });


        // Convert stream into line-by-line reader
        const lineReader = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });


        let isHeader = true;


        // Every time a line is received
        lineReader.on("line", (line) => {

            // First line contains column names
            if (isHeader) {

                isHeader = false;

                return;
            }


            // Ignore empty lines
            if (!line.trim()) {
                return;
            }


            total++;


            // Convert CSV line into array
            const row = line.split(",");


            // Validate number of columns
            if (row.length !== 9) {

                skipped++;

                return;
            }


            // Convert row into object
            const employee = createEmployee(row);


            // Apply filter
            if (matchesFilter(employee, filters)) {

                matched++;

                appEvents.emit(
                    "recordMatched",
                    employee
                );


                // Write immediately
                const canContinue = outputStream.write(
                    JSON.stringify(employee) + "\n"
                );


                /*
                 * If write buffer is full, Node.js applies
                 * backpressure.
                 */
                if (!canContinue) {

                    lineReader.pause();

                    outputStream.once("drain", () => {
                        lineReader.resume();
                    });

                }

            } else {

                skipped++;
            }


            // Notify application
            appEvents.emit(
                "recordProcessed",
                total
            );

        });


        // CSV reading error
        fileStream.on("error", (error) => {

            appEvents.emit(
                "errorOccurred",
                error
            );

            reject(error);

        });


        // Finished reading CSV
        lineReader.on("close", () => {

            outputStream.end();


            outputStream.once("finish", () => {

                const stats = {
                    total,
                    matched,
                    skipped
                };


                appEvents.emit(
                    "completed",
                    stats
                );


                resolve(stats);

            });

        });

    });

}