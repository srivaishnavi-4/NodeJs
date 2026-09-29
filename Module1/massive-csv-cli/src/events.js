import { EventEmitter } from "node:events";

// Create a central event emitter
export const appEvents = new EventEmitter();


// Event: when a record is processed
appEvents.on("recordProcessed", (count) => {
    if (count % 1000 === 0) {
        console.log(`Processed ${count} records...`);
    }
});


// Event: when a record matches our filter
appEvents.on("recordMatched", (record) => {
    // We don't print every record because
    // a massive CSV could contain thousands of matches.
});


// Event: when processing completes
appEvents.on("completed", (stats) => {
    console.log("\n========== PROCESSING COMPLETED ==========");
    console.log(`Total records   : ${stats.total}`);
    console.log(`Matched records : ${stats.matched}`);
    console.log(`Skipped records : ${stats.skipped}`);
});


// Event: when an error occurs
appEvents.on("errorOccurred", (error) => {
    console.error("Application Error:", error.message);
});