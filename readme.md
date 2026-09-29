# MODULE1
# Node.js Runtime, Event Loop, Asynchronous Programming, EventEmitter, Streams and Modules
# 1. What is Node.js?
## Definition
**Node.js is a JavaScript runtime environment that allows JavaScript code to run outside a web browser.**
Normally, JavaScript runs inside a browser:
```text
JavaScript
     ↓
Browser
     ↓
JavaScript Engine
     ↓
Execution
```
Node.js allows JavaScript to run directly on the computer/server:
```text
JavaScript
     ↓
Node.js Runtime
     ↓
V8 Engine
     ↓
Execution
```
### Simple example
```javascript
console.log("Hello from Node.js");
```
Run:
```bash
node app.js
```
Output:
```text
Hello from Node.js
```
## Why do we use Node.js?
Before Node.js, JavaScript was mainly associated with browser applications.
Node.js allows developers to use JavaScript for:
* Backend APIs
* Web servers
* REST APIs
* Real-time applications
* CLI applications
* File processing
* Automation
* Microservices
* Streaming applications
### Real-time example
Suppose you are building an e-commerce application.
The frontend can be:
```text
React
```
and the backend can be:
```text
Node.js
```
The architecture becomes:
```text
Browser
   ↓
React Application
   ↓
HTTP Request
   ↓
Node.js Server
   ↓
Database
```
So instead of learning one language for frontend and another for backend, a team can use JavaScript across both sides.
# 2. Why was Node.js needed?
Consider a server receiving 1,000 requests.
Many requests involve waiting for:
```text
Database
File
Network
API
```
For example:
```javascript
const data = readFile();
```
If the application waits synchronously for the file:
```text
Request
   ↓
Read file
   ↓
WAIT
   ↓
File completed
   ↓
Continue
```
The server wastes time waiting.
Node.js uses asynchronous I/O:
```text
Request
   ↓
Start file operation
   ↓
Continue doing other work
   ↓
File completed
   ↓
Process result
```
### Why is this useful?
Because server applications spend a lot of time waiting for external operations.
Node.js is particularly useful for applications with many I/O operations.
# 3. History of Node.js
Understanding the history explains why Node.js was designed around asynchronous programming.
## JavaScript — 1995
JavaScript was originally created for web browsers.
```text
Browser
   ↓
JavaScript
   ↓
Dynamic web pages
```
JavaScript engines became increasingly faster.
## V8 — 2008
Google introduced the **V8 JavaScript engine** with Chrome.
V8 provided high-performance JavaScript execution.
```text
JavaScript
    ↓
V8
    ↓
Machine-level execution
```
This made JavaScript fast enough for applications beyond simple browser scripting.
## Node.js — 2009
Ryan Dahl introduced Node.js.
The major idea was:
> Use JavaScript with an event-driven, non-blocking I/O model for server-side applications.
Node.js combined:
```text
V8
+
Asynchronous I/O
+
Event-driven architecture
+
Server-side APIs
```
## npm
The Node.js ecosystem also grew rapidly through **npm**, which provides packages that developers can reuse.
For example:
```bash
npm install express
```
This allows developers to use existing libraries rather than implementing everything from scratch.
# 4. V8 Engine
## Definition
**V8 is Google's JavaScript and WebAssembly engine that executes JavaScript code.**
V8 is used by:
* Google Chrome
* Node.js
* Other applications embedding V8
## Why do we use V8 in Node.js?
Node.js needs something that can actually **execute JavaScript**.
Node.js itself is not the JavaScript engine.
Think of it this way:
```text
JavaScript
    ↓
V8
    ↓
Executes JavaScript
```
Node.js adds capabilities around V8:
```text
                Node.js
                   │
          ┌────────┴────────┐
          │                 │
         V8              Node APIs
          │                 │
   Executes JS          fs, http,
                        events,
                        streams
```
Therefore:
### V8
Responsible mainly for:
```text
JavaScript execution
Memory management
Garbage collection
Optimization
```
### Node.js
Provides:
```text
File system
HTTP
Networking
Streams
Events
Processes
Timers
Modules
```
# 5. V8 Architecture
A simplified V8 architecture is:
```text
JavaScript Source Code
          ↓
        Parser
          ↓
      Bytecode
          ↓
       Ignition
          ↓
   Execute JavaScript
          ↓
 Runtime profiling
          ↓
      TurboFan
          ↓
 Optimized machine code
```
## Step 1 — JavaScript source
Example:
```javascript
function add(a, b) {
    return a + b;
}
console.log(add(10, 20));
```
V8 receives this JavaScript code.
## Step 2 — Parser
V8 parses the JavaScript and understands its structure.
For example:
```javascript
a + b
```
is understood as an addition operation.
## Step 3 — Ignition
V8's interpreter, **Ignition**, executes JavaScript using bytecode.
Simplified:
```text
JavaScript
    ↓
Bytecode
    ↓
Ignition
    ↓
Execution
```
## Step 4 — Optimization
If V8 notices that some code runs frequently, it can optimize that code.
TurboFan is V8's optimizing compiler.
```text
Frequently executed code
        ↓
Optimization
        ↓
Faster machine code
```
### Why?
Because applications can execute the same functions thousands or millions of times.
Optimizing frequently executed code can improve performance.
# 6. V8 Memory
V8 manages memory for JavaScript objects.
Simplified:
```text
V8 Memory
│
├── Stack
│
└── Heap
```
## Stack
The stack is associated with function execution and call frames.
Example:
```javascript
function first() {
    second();
}

function second() {
    console.log("Hello");
}

first();
```
Execution:
```text
first()
  ↓
second()
  ↓
console.log()
```
The call stack tracks these active function calls.
## Heap
Objects and dynamically allocated data are stored in the managed heap.
Example:
```javascript
const user = {
    name: "Vaishu",
    age: 22
};
```
The object is managed by V8's memory system.
# 7. Garbage Collection
## Definition
**Garbage collection is the automatic process of identifying unreachable objects and reclaiming their memory.**
Example:
```javascript
let user = {
    name: "Vaishu"
};
user = null;
```
If there are no other references to the object:
```text
Object
  ↓
Referenced

user = null
  ↓
No reference
  ↓
Eligible for garbage collection
```
## Why do we use garbage collection?
Without automatic memory management, developers would have to manually release memory.
JavaScript provides automatic memory management, making application development easier.
# 8. Node.js Runtime Architecture
This is different from V8 architecture.
## Definition
The **Node.js runtime environment is the complete environment that allows JavaScript to run outside the browser.**
It combines several components.
```text
                    Node.js Application
                           │
                           ▼
                     JavaScript Code
                           │
                           ▼
                          V8
                           │
                    Executes JavaScript
                           │
                           ▼
                    Node.js APIs
                           │
             ┌─────────────┼─────────────┐
             │             │             │
            fs            http        streams
             │             │             │
             └─────────────┼─────────────┘
                           ↓
                         libuv
                           ↓
                    Asynchronous I/O
                           ↓
                      Operating System
```
# 9. What is libuv?
## Definition
**libuv is a library used by Node.js to provide asynchronous, cross-platform I/O capabilities and the Event Loop infrastructure.**
You don't normally call libuv directly.
Node.js uses it internally.
## Why do we use libuv?
Different operating systems have different mechanisms for handling asynchronous operations.
For example:
```text
Windows
Linux
macOS
```
Node.js needs a consistent way to handle asynchronous operations across platforms.
libuv provides that abstraction.
# 10. Node.js Architecture — Complete View
```text
                    Node.js Application
                           │
                           ▼
                    JavaScript Code
                           │
                           ▼
                          V8
                 JavaScript execution
                           │
                           ▼
                    Node.js APIs
                           │
          ┌────────────────┼────────────────┐
          │                │                │
         fs               http          streams
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                         libuv
                           │
              ┌────────────┴────────────┐
              │                         │
         Event Loop                Worker Pool
              │                         │
              ▼                         ▼
       Async callbacks         Expensive operations
              │
              ▼
        JavaScript execution
```
### Why this architecture?
Because Node.js wants JavaScript developers to work with asynchronous operations without manually managing low-level operating-system threads.
# 11. Event Loop
## Definition
**The Event Loop is the mechanism that allows Node.js to handle asynchronous operations and execute their callbacks when they are ready.**
This is one of the most important Node.js concepts.
## Why do we use the Event Loop?
Suppose we read a file:
```javascript
fs.readFile("users.json", callback);
```
Reading the file can take time.
Node.js doesn't want the JavaScript execution thread to simply sit and wait.
Instead:
```text
JavaScript
   ↓
Start file operation
   ↓
Continue executing
   ↓
File completes
   ↓
Callback becomes ready
   ↓
Event Loop
   ↓
Callback executes
```
This allows Node.js to handle other work while I/O is happening.
# 12. Event Loop Architecture
A simplified Node.js Event Loop:
```text
                    Event Loop
                        │
                        ▼
                ┌──────────────┐
                │    Timers    │
                │ setTimeout   │
                │ setInterval  │
                └──────┬───────┘
                       ↓
                ┌──────────────┐
                │   Pending    │
                │  callbacks   │
                └──────┬───────┘
                       ↓
                ┌──────────────┐
                │ Idle/Prepare │
                └──────┬───────┘
                       ↓
                ┌──────────────┐
                │     Poll     │
                │              │
                │     I/O      │
                └──────┬───────┘
                       ↓
                ┌──────────────┐
                │    Check     │
                │setImmediate  │
                └──────┬───────┘
                       ↓
                ┌──────────────┐
                │    Close     │
                │   events     │
                └──────┬───────┘
                       │
                       └──────→ Repeat
```
# 13. Timers
## Definition
Timers allow us to schedule JavaScript callbacks for a later time.
Important APIs:

```javascript
setTimeout()
setInterval()
```
## Why do we use timers?
Examples:
* Retry an operation
* Schedule a task
* Run periodic monitoring
* Delay an operation
* Poll an external service
### Example
```javascript
setTimeout(() => {
    console.log("Payment verification started");
}, 2000);
```
This schedules the callback after the timer threshold.
## Important point
This:

```javascript
setTimeout(callback, 2000);
```
does **not** mean:
> The callback will execute exactly at 2000 ms.
It means:

> The callback becomes eligible after the timer threshold, and execution occurs when Node.js can process it.
# 14. I/O Polling
## Definition
The **poll phase** is responsible for handling many I/O-related callbacks and determining whether the Event Loop should wait for additional I/O.
Example:
```javascript
const fs = require("node:fs");
fs.readFile("users.json", "utf8", (error, data) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(data);
});
```
## Why is polling needed?
Because I/O operations don't necessarily finish immediately.
The Event Loop needs a mechanism to:
```text
Check for completed I/O
       ↓
Process available callbacks
       ↓
Wait when appropriate
       ↓
Continue processing
```
# 15. setImmediate()
## Definition
`setImmediate()` schedules a callback to execute during the Event Loop's **check phase**.
Example:
```javascript
setImmediate(() => {
    console.log("Immediate work");
});
```
## Why do we use setImmediate()?
It is particularly useful when you want to schedule work to happen after the current I/O callback processing.
Real-time example:
```javascript
const fs = require("node:fs");
fs.readFile("users.json", () => {
    setImmediate(() => {
        console.log("Process result after I/O callback");
    });
});
```
Here:
```text
File I/O
   ↓
I/O callback
   ↓
setImmediate
   ↓
Additional processing
```
# 16. process.nextTick()
## Definition
`process.nextTick()` schedules a callback to execute after the current JavaScript operation completes, before Node.js continues through the normal Event Loop phases.
Example:
```javascript
console.log("Start");

process.nextTick(() => {
    console.log("nextTick");
});
console.log("End");
```
Output:
```text
Start
End
nextTick
```
## Why do we use process.nextTick()?
Suppose you are creating a Node.js API and want to ensure a callback is executed asynchronously, even when the result is already available.
Example:
```javascript
function getUser(callback) {

    const user = {
        id: 101,
        name: "Vaishu"
    };

    process.nextTick(() => {
        callback(null, user);
    });
}
```
This keeps the callback asynchronous.
## Important warning
Do not continuously schedule `process.nextTick()`:
```javascript
function loop() {
    process.nextTick(loop);
}
loop();
```
This can prevent the Event Loop from progressing normally.
# 17. process.nextTick vs setImmediate

| Concept          | `process.nextTick()`              | `setImmediate()`         |
| ---------------- | --------------------------------- | ------------------------ |
| Purpose          | Very soon after current operation | Schedule for check phase |
| Event Loop phase | Not a normal phase                | Check phase              |
| Priority         | Very high                         | Later                    |
| Common use       | API callback deferral             | Post-I/O work            |

Remember:
```text
Current operation
      ↓
nextTick queue
      ↓
Microtasks
      ↓
Event Loop phases
```
The exact ordering of timers and `setImmediate()` can depend on where they are scheduled.
# 18. Callback Pattern
## Definition
A callback is a function passed to another function so that it can be executed later.
Example:
```javascript
function loginUser(callback) {
    const user = {
        name: "Vaishu"
    };
    callback(null, user);
}
loginUser((error, user) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(user);
});
```
## Why do we use callbacks?
Callbacks were one of the original ways Node.js APIs handled asynchronous operations.
For example:
```javascript
const fs = require("node:fs");

fs.readFile("users.json", "utf8", (error, data) => {

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);
});
```
The callback runs when the operation completes.
# 19. Callback Hell
Consider a real application:
```text
Login user
   ↓
Get user details
   ↓
Get orders
   ↓
Get payment
   ↓
Generate invoice
```
Using nested callbacks:
```javascript
loginUser((error, user) => {

    if (error) return handleError(error);

    getUserDetails(user.id, (error, details) => {

        if (error) return handleError(error);

        getOrders(user.id, (error, orders) => {

            if (error) return handleError(error);

            getPayment(orders[0].id, (error, payment) => {

                if (error) return handleError(error);

                generateInvoice(payment, (error, invoice) => {

                    if (error) return handleError(error);

                    console.log(invoice);
                });
            });
        });
    });
});
```
## Why is callback hell a problem?
Because:
```text
Hard to read
Hard to maintain
Hard to debug
Repeated error handling
Deep nesting
```
This is why Promises became important.
# 20. Promises
## Definition
A **Promise represents the eventual result of an asynchronous operation.**
A Promise has three states:
```text
Pending
   ↓
Fulfilled
or
Pending
   ↓
Rejected
```
## Why do we use Promises?
Promises make asynchronous operations easier to compose.
Instead of:
```text
callback
   ↓
callback
   ↓
callback
   ↓
callback
```
we can write:
```text
Promise
   ↓
then()
   ↓
then()
   ↓
catch()
```
# 21. Creating a Promise
```javascript
function getUser() {

    return new Promise((resolve, reject) => {

        const user = {
            id: 101,
            name: "Vaishu"
        };

        resolve(user);
    });
}
```
Use it:
```javascript
getUser()
    .then(user => {
        console.log(user);
    })
    .catch(error => {
        console.error(error);
    });
```
# 22. Promise Refactoring
### Callback version
```javascript
getUser((error, user) => {

    if (error) {
        return handleError(error);
    }

    getOrders(user.id, (error, orders) => {

        if (error) {
            return handleError(error);
        }

        console.log(orders);
    });
});
```
### Promise version
```javascript
getUser()
    .then(user => getOrders(user.id))
    .then(orders => {
        console.log(orders);
    })
    .catch(error => {
        console.error(error);
    });
```
### Why is this better?
The flow is easier to see:
```text
Get User
   ↓
Get Orders
   ↓
Handle result
   ↓
Handle errors
```
# 23. async/await
## Definition
`async/await` provides a cleaner syntax for working with Promises.
Example:
```javascript
async function loadOrders() {
    try {
        const user = await getUser();

        const orders = await getOrders(user.id);

        console.log(orders);

    } catch (error) {

        console.error(error);
    }
}
```
## Why do we use async/await?
Because it makes asynchronous code easier to read.
Compare:
```javascript
getUser()
    .then(user => getOrders(user.id))
    .then(orders => getPayment(orders))
    .then(payment => generateInvoice(payment))
    .catch(handleError);
```
with:
```javascript
async function processOrder() {
    try {
        const user = await getUser();

        const orders = await getOrders(user.id);

        const payment = await getPayment(orders);

        const invoice = await generateInvoice(payment);

    } catch (error) {

        handleError(error);
    }
}
```
The second version is often easier to understand.
# 24. Promise.all()
## Why?
Suppose these two operations don't depend on each other:
```javascript
const user = await getUser();
const products = await getProducts();
```
This waits sequentially.
Instead:
```javascript
const [user, products] = await Promise.all([
    getUser(),
    getProducts()
]);
```
Both operations can proceed concurrently.
### Use Promise.all when:
```text
Operation A
     │
     ├── independent
     │
Operation B
```
### Don't use it blindly when:
```text
Operation A
     ↓
Operation B depends on A
```
# 25. EventEmitter
## Definition
`EventEmitter` is a Node.js pattern where an object can **emit named events and notify registered listeners**.
Think:
```text
Something happens
       ↓
Event emitted
       ↓
Listeners notified
```
## Why do we use EventEmitter?
Imagine an order is created.
Multiple things may need to happen:
```text
Order Created
     │
     ├── Send Email
     ├── Update Inventory
     ├── Create Log
     └── Notify Customer
```
Instead of tightly connecting all these operations:
```javascript
createOrder();

sendEmail();

updateInventory();

createLog();

notifyCustomer();
```
we can emit one event:
```javascript
orderEmitter.emit("orderCreated", order);
```
Different components can listen independently.
# 26. EventEmitter Example
```javascript
const { EventEmitter } = require("node:events");

const orderEmitter = new EventEmitter();

orderEmitter.on("orderCreated", order => {

    console.log(
        `Email sent for order ${order.id}`
    );
});
orderEmitter.on("orderCreated", order => {
    console.log(
        `Inventory updated for order ${order.id}`
    );
});
orderEmitter.emit("orderCreated", {
    id: 1001,
    customer: "Vaishu"
});
```
Output:
```text
Email sent for order 1001
Inventory updated for order 1001
```
# 27. Important EventEmitter Methods
## on()
Register a listener.
```javascript
emitter.on("login", () => {
    console.log("User logged in");
});
```
### Why?
The listener runs whenever the event occurs.
## once()
```javascript
emitter.once("startup", () => {
    console.log("Application started");
});
```
### Why?
Runs only once.
Useful for:
```text
Initialization
First connection
One-time setup
```
## emit()
```javascript
emitter.emit("login");
```
### Why?
Triggers the event.
## off()
```javascript
emitter.off("login", listener);
```
### Why?
Removes a previously registered listener.
# 28. Streams
## Definition
A **stream is a mechanism for processing data incrementally instead of loading the entire data into memory at once.**
Imagine a 5 GB file.
Without a stream:
```text
5 GB File
    ↓
Load entire file
    ↓
Memory
```

With a stream:

```text
5 GB File
    ↓
Chunk 1 → process
    ↓
Chunk 2 → process
    ↓
Chunk 3 → process
    ↓
...
```
## Why do we use streams?
Streams are useful when handling large or continuous data.
Examples:

```text
Large files
Video
Audio
File uploads
File downloads
HTTP responses
Logs
```
The main advantage is that you don't need to keep the entire dataset in memory.
# 29. fs.createReadStream()
## Definition
`fs.createReadStream()` creates a readable stream for reading file data progressively.
Example:
```javascript
const fs = require("node:fs");

const stream = fs.createReadStream(
    "server.log",
    {
        encoding: "utf8"
    }
);

stream.on("data", chunk => {

    console.log("Received chunk");

});

stream.on("end", () => {

    console.log("Finished reading file");

});

stream.on("error", error => {

    console.error(error);

});
```
## Why use createReadStream()?
Suppose:
```text
server.log = 10 GB
```
Using:
```javascript
fs.readFile()
```
tries to provide the complete file contents.
Using:
```javascript
fs.createReadStream()
```
allows incremental processing.
# 30. Streams and EventEmitter
This is an important connection.
Streams expose events such as:
```text
data
end
error
close
```
Therefore:
```text
Readable Stream
      ↓
Event-driven
      ↓
Listeners
```
Example:
```javascript
stream.on("data", chunk => {
    console.log(chunk);
});
```
The stream emits `data` events as chunks become available.
# 31. CommonJS
## Definition
**CommonJS is a module system traditionally used by Node.js.**
Main syntax:
```javascript
require()
module.exports
```
## Why do we use modules?
Imagine one application has:
```text
100 JavaScript functions
```
Putting everything in one file becomes difficult.
Instead:
```text
user.js
order.js
payment.js
server.js
```
Each file handles a specific responsibility.
# 32. CommonJS Example
### math.js
```javascript
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

module.exports = {
    add,
    multiply
};
```
### app.js
```javascript
const math = require("./math");

console.log(math.add(10, 20));

console.log(math.multiply(5, 4));
```
Run:
```bash
node app.js
```
Output:
```text
30
20
```
# 33. ECMAScript Modules
## Definition
**ECMAScript Modules (ESM) are JavaScript's standardized module system using `import` and `export`.**
Example:
```javascript
export function add(a, b) {
    return a + b;
}
```
Import:
```javascript
import { add } from "./math.js";
```
## Why do we use ESM?
ESM provides the standard JavaScript module syntax.
It is useful when:
* Building modern Node.js applications
* Sharing code with browser JavaScript
* Using `import/export`
* Using top-level `await`
# 34. ESM Example
### math.js
```javascript
export function add(a, b) {
    return a + b;
}
export function multiply(a, b) {
    return a * b;
}
```
### app.js
```javascript
import {
    add,
    multiply
} from "./math.js";

console.log(add(10, 20));

console.log(multiply(5, 4));
```
`package.json`:
```json
{
    "type": "module"
}
```
Run:
```bash
node app.js
```
# 35. CommonJS vs ESM

| Concept                           | CommonJS                  | ESM      |
| --------------------------------- | ------------------------- | -------- |
| Import                            | `require()`               | `import` |
| Export                            | `module.exports`          | `export` |
| Standard JavaScript module system | No                        | Yes      |
| Node.js support                   | Yes                       | Yes      |
| Top-level await                   | Not in the same ESM sense | Yes      |
| Typical modern syntax             | No                        | Yes      |

### CommonJS
```javascript
const fs = require("node:fs");
```
### ESM
```javascript
import fs from "node:fs";
```