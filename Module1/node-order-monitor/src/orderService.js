const EventEmitter = require("node:events");

class OrderService extends EventEmitter {

    processOrder(order) {

        console.log(
            `Processing order ${order.id}...`
        );

        // Simulate an order-processing event
        this.emit("orderProcessed", order);
    }
}

module.exports = OrderService;