const fs = require("node:fs/promises");

async function saveReport(report) {

    const jsonData = JSON.stringify(
        report,
        null,
        2
    );

    await fs.writeFile(
        "output/report.json",
        jsonData
    );

    console.log(
        "Report saved to output/report.json"
    );
}

module.exports = {
    saveReport
};