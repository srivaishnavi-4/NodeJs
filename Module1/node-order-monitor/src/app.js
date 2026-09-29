const path = require("node:path");

const OrderService = require("./orderService");

const {
    readOrders
} = require("./fileReader");

const {
    saveReport
} = require("./reportService");


// ----------------------------------------
// 1. Create Order Service
// ----------------------------------------

const orderService = new OrderService();


// ----------------------------------------
// 2. Report object
// ----------------------------------------

const report = {

    totalOrders: 0,

    totalAmount: 0,

    customers: {}

};


// ----------------------------------------
// 3. EventEmitter listener
// ----------------------------------------

orderService.on(
    "orderProcessed",
    order => {

        console.log(
            `Order ${order.id} processed successfully`
        );

        report.totalOrders++;

        report.totalAmount += order.amount;


        // Count customer orders

        if (!report.customers[order.customer]) {

            report.customers[order.customer] = 0;

        }

        report.customers[order.customer]++;
    }
);


// ----------------------------------------
// 4. Main asynchronous function
// ----------------------------------------

async function main() {

    try {

        console.log(
            "================================"
        );

        console.log(
            "   NODE.JS ORDER MONITOR"
        );

        console.log(
            "================================"
        );


        // --------------------------------
        // Build file path
        // --------------------------------

        const filePath = path.join(
            __dirname,
            "../data/orders.log"
        );


        console.log(
            `Reading file: ${filePath}`
        );


        // --------------------------------
        // Read orders using Stream
        // --------------------------------

        await readOrders(
            filePath,

            line => {

                const parts = line.split(",");

                const id = parts[0];

                const customer = parts[1];

                const product = parts[2];

                const amount = Number(parts[3]);


                const order = {

                    id,

                    customer,

                    product,

                    amount
                };


                // Process order

                orderService.processOrder(order);
            }
        );


        // --------------------------------
        // Save final report
        // --------------------------------

        await saveReport(report);


        // --------------------------------
        // Display result
        // --------------------------------

        console.log(
            "\n================================"
        );

        console.log(
            "          FINAL REPORT"
        );

        console.log(
            "================================"
        );

        console.log(
            `Total Orders: ${report.totalOrders}`
        );

        console.log(
            `Total Amount: ₹${report.totalAmount}`
        );

        console.log(
            "\nCustomer Orders:"
        );

        console.table(
            report.customers
        );

    }

    catch (error) {

        console.error(
            "\nApplication failed:"
        );

        console.error(error.message);
    }
}


// ----------------------------------------
// Start application
// ----------------------------------------

main();