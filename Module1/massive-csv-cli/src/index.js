import fs from "node:fs";

import { processCSV } from "./csvReader.js";
import { createOutputStream } from "./writer.js";

import {
    startMemoryMonitor,
    stopMemoryMonitor,
    getMemoryUsage
} from "./memoryMonitor.js";


// --------------------------------------------------
// Parse command line arguments
// --------------------------------------------------

const args = process.argv.slice(2);


// Required arguments
const inputPath = args[0];
const outputPath = args[1];


// --------------------------------------------------
// Parse optional filters
// --------------------------------------------------

const filters = {};

for (const argument of args.slice(2)) {

    const [key, value] = argument.split("=");

    if (!key || value === undefined) {
        continue;
    }

    switch (key) {

        case "--city":
            filters.city = value;
            break;

        case "--education":
            filters.education = value;
            break;

        case "--gender":
            filters.gender = value;
            break;

        case "--leave":
            filters.leave = value;
            break;

        case "--minExperience":
            filters.minExperience = value;
            break;

        case "--maxAge":
            filters.maxAge = value;
            break;

    }
}


// --------------------------------------------------
// Validate arguments
// --------------------------------------------------

if (!inputPath || !outputPath) {

    console.log(`
Usage:

node src/index.js <input.csv> <output.txt> [filters]

Example:

node src/index.js data/input.csv output/filtered.txt --city=Bangalore --leave=1

Available filters:

--city=Bangalore
--education=Bachelors
--gender=Female
--leave=1
--minExperience=2
--maxAge=35
`);

    process.exit(1);
}


// --------------------------------------------------
// Check input file
// --------------------------------------------------

if (!fs.existsSync(inputPath)) {

    console.error(
        `Input file not found: ${inputPath}`
    );

    process.exit(1);
}


// --------------------------------------------------
// Main async function
// --------------------------------------------------

async function main() {

    console.log("\n======================================");
    console.log(" Massive CSV Processing CLI");
    console.log("======================================\n");


    console.log("Input :", inputPath);
    console.log("Output:", outputPath);


    console.log("\nFilters:");

    console.log(
        Object.keys(filters).length
            ? filters
            : "No filters"
    );


    // Start memory monitoring
    startMemoryMonitor();


    // Create output stream
    const outputStream =
        createOutputStream(outputPath);


    try {

        // Process CSV
        const stats = await processCSV(
            inputPath,
            outputStream,
            filters
        );


        // Stop memory monitoring
        const peakMemory =
            stopMemoryMonitor();


        console.log("\n======================================");
        console.log("Final Memory Statistics");
        console.log("======================================");

        console.log(
            `Current memory: ${getMemoryUsage()} MB`
        );

        console.log(
            `Peak memory   : ${peakMemory} MB`
        );


        console.log("\nProcessing completed successfully.");

    } catch (error) {

        stopMemoryMonitor();

        console.error(
            "\nProcessing failed:",
            error.message
        );

        process.exit(1);
    }
}


// Start application
main();