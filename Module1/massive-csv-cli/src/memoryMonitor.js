import { CONFIG } from "./config.js";

let intervalId = null;

let peakMemory = 0;


// Convert bytes → MB
function bytesToMB(bytes) {
    return bytes / (1024 * 1024);
}


// Get current RSS memory
export function getMemoryUsage() {

    const memory = process.memoryUsage();

    const rssMB = bytesToMB(memory.rss);

    return Number(rssMB.toFixed(2));
}


// Start monitoring memory
export function startMemoryMonitor() {

    console.log(
        `Memory limit: ${CONFIG.MAX_MEMORY_MB} MB`
    );

    intervalId = setInterval(() => {

        const currentMemory = getMemoryUsage();

        if (currentMemory > peakMemory) {
            peakMemory = currentMemory;
        }

        console.log(
            `Current memory: ${currentMemory} MB`
        );

        if (currentMemory > CONFIG.MAX_MEMORY_MB) {

            console.error(
                `WARNING: Memory exceeded ${CONFIG.MAX_MEMORY_MB} MB`
            );
        }

    }, 5000);
}


// Stop monitoring
export function stopMemoryMonitor() {

    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    return peakMemory;
}