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

# MODULE2
## 1_Initializing an Express Application and Configuring Environment Variables with `dotenv`
When building a Node.js backend, we usually need two things:
1. **Express** → to create the web server and handle HTTP requests.
2. **dotenv** → to store configuration values such as ports, database URLs, API keys, etc. outside the source code.
# 1. What is Express?
**Express.js** is a Node.js web framework used to build:
* Web servers
* REST APIs
* Backend applications
* Middleware-based applications
* Route handling
Without Express, handling HTTP requests directly with Node's `http` module requires more code.
### Without Express
```javascript
const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/users") {
        res.end("Users");
    }
});
server.listen(3000);
```
### With Express
```javascript
const express = require("express");
const app = express();
app.get("/users", (req, res) => {
    res.send("Users");
});
app.listen(3000);
```
Express makes routing and request handling much simpler.
# 2. What is an Express Application?
An Express application is created using:
```javascript
const express = require("express");
const app = express();
```
Here:
```javascript
express()
```
creates an Express application object.
We store it in:
```javascript
app
```
Then we can use `app` to configure our server.
For example:
```javascript
app.get("/users", (req, res) => {
    res.json({
        message: "User list"
    });
});
```
# 3. What is `dotenv`?
`dotenv` is a package that loads variables from a `.env` file into:
```javascript
process.env
```
For example, instead of writing:
```javascript
const PORT = 5000;
```
we can put:
```env
PORT=5000
```
inside `.env`.
Then access it using:
```javascript
process.env.PORT
```
# 4. Why do we use `.env`?
Imagine your application has:
```javascript
const PORT = 5000;
const DB_PASSWORD = "mypassword";
const API_KEY = "123456";
```
Putting configuration and secrets directly into JavaScript is not a good practice.
Instead:
```text
.env
 ↓
environment variables
 ↓
process.env
 ↓
application
```
This allows configuration to change without modifying the source code.
# 5. Project Structure
Let's create a small Express application.
```text
express-env-poc/
│
├── node_modules/
│
├── .env
├── .gitignore
├── package.json
└── app.js
```
# 6. Create the Project
Open terminal:
```bash
mkdir express-env-poc
cd express-env-poc
```
Initialize Node:
```bash
npm init -y
```
Install Express:
```bash
npm install express
```
Install dotenv:
```bash
npm install dotenv
```
# 7. Create `.env`
Create:
```text
.env
```
Add:
```env
PORT=5000
APP_NAME=Student Management API
NODE_ENV=development
```
So your `.env` looks like:
```text
PORT=5000
APP_NAME=Student Management API
NODE_ENV=development
```
# 8. Load dotenv
In `app.js`:
```javascript
require("dotenv").config();
```
This loads the `.env` variables.
Now:
```javascript
process.env.PORT
```
will contain:
```text
5000
```
And:
```javascript
process.env.APP_NAME
```
will contain:
```text
Student Management API
```
# 9. Initialize Express
Complete `app.js`:
```javascript
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
        application: process.env.APP_NAME,
        environment: process.env.NODE_ENV
    });

});
app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME} running on port ${PORT}`);

});
```
# 10. Run the Application
Run:
```bash
node app.js
```
You should see:
```text
Student Management API running on port 5000
```
Open:
```text
http://localhost:5000
```
Response:
```json
{
    "message": "Server is running",
    "application": "Student Management API",
    "environment": "development"
}
```
# 11. How the Flow Works
The complete flow is:
```text
.env
 │
 │ PORT=5000
 │ APP_NAME=Student Management API
 │
 ↓
dotenv
 │
 ↓
process.env
 │
 ├── process.env.PORT
 ├── process.env.APP_NAME
 └── process.env.NODE_ENV
 │
 ↓
Express application
 │
 ↓
app.listen(PORT)
 │
 ↓
Server starts
```
# 12. Why `process.env.PORT || 3000`?
We wrote:
```javascript
const PORT = process.env.PORT || 3000;
```
This means:
> If `PORT` exists in the environment, use it. Otherwise use `3000`.
For example:
```text
.env has PORT=5000
process.env.PORT
       ↓
     5000
```
So:
```javascript
PORT = 5000
```
If `.env` doesn't contain `PORT`:
```text
process.env.PORT
       ↓
   undefined
       ↓
    3000
```
Therefore:
```javascript
const PORT = process.env.PORT || 3000;
```
provides a fallback.
# 13. Why `.env` should not be pushed to GitHub
`.env` can contain sensitive information:
```env
DB_PASSWORD=secret
API_KEY=abc123
JWT_SECRET=mysecret
```
So add `.env` to `.gitignore`.
### `.gitignore`
```text
node_modules/
.env
```
This prevents Git from tracking the `.env` file.
Instead, you can provide a sample:
### `.env.example`
```env
PORT=5000
APP_NAME=Student Management API
NODE_ENV=development
```
This tells other developers which variables they need without exposing your actual secrets.

### `.env`
Contains actual values:
```env
PORT=5000
DB_PASSWORD=secret123
```
### `.env.example`
Contains the expected configuration structure:
```env
PORT=
DB_PASSWORD=
```
### `process.env`
This is how your Node.js application accesses the values:
```javascript
process.env.PORT
process.env.DB_PASSWORD
```
## 15. Real Backend Example
Later, when you build a database-backed API, your `.env` might contain:
```env
PORT=5000
DATABASE_URL=postgresql://localhost:5432/studentdb
JWT_SECRET=my-secret-key
NODE_ENV=development
```
Your application can then use:
```javascript
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
```
The actual configuration stays outside your application code.
### In short
```text
Express
→ Creates and manages the server/API
dotenv
→ Loads configuration from .env
process.env
→ Gives your Node.js application access to those values
.env
→ Stores environment-specific configuration
```
This pattern is commonly used when moving the same Node.js application between **development, testing, and production** environments.

## 2_## HTTP Request Methods in Node.js / Express
HTTP request methods define **what operation the client wants to perform on a resource**. In a REST API, the most commonly used methods are:
| Method     | Purpose                            | Example                         |
| ---------- | ---------------------------------- | ------------------------------- |
| **GET**    | Retrieve data                      | Get student details             |
| **POST**   | Create new data                    | Add a new student               |
| **PUT**    | Replace/update the entire resource | Replace all student details     |
| **PATCH**  | Partially update a resource        | Change only the student's email |
| **DELETE** | Remove data                        | Delete a student                |
### 1. GET – Retrieve Data
**Why do we use it?**
GET is used when the client wants to **read or retrieve existing data** from the server.
```js
app.get("/students", (req, res) => {
    res.status(200).json({
        message: "Students retrieved successfully"
    });
});
```
**Semantic status code:** `200 OK`
### 2. POST – Create Data
**Why do we use it?**
POST is used when the client wants to **create a new resource** on the server.
```js
app.post("/students", (req, res) => {
    const student = req.body;
    res.status(201).json({
        message: "Student created successfully",
        data: student
    });
});
```
**Semantic status code:** `201 Created`
### 3. PUT – Replace/Update Entire Data
**Why do we use it?**
PUT is generally used to **replace the complete existing resource** with the data sent by the client.
```js
app.put("/students/101", (req, res) => {
    const updatedStudent = req.body;
    res.status(200).json({
        message: "Student details replaced successfully",
        data: updatedStudent
    });
});
```
**Semantic status code:** `200 OK`
Example:
```text
Existing:
{
    name: "Vaishu",
    age: 21,
    department: "CSE"
}

PUT:
{
    name: "Vaishu",
    age: 22,
    department: "AI"
}
```
The complete resource is replaced.
### 4. PATCH – Partially Update Data
**Why do we use it?**
PATCH is used when we want to **modify only specific fields** without replacing the entire resource.
```js
app.patch("/students/101", (req, res) => {
    const changes = req.body;
    res.status(200).json({
        message: "Student details partially updated",
        changes: changes
    });
});
```
**Semantic status code:** `200 OK`
Example:
```text
Existing:
{
    name: "Vaishu",
    age: 21,
    department: "CSE"
}

PATCH:
{
    department: "AI"
}
```
Only the `department` is changed.
### 5. DELETE – Remove Data
**Why do we use it?**
DELETE is used when the client wants to **remove a resource** from the server.
```js
app.delete("/students/101", (req, res) => {
    res.status(204).send();
});
```
**Semantic status code:** `204 No Content`
# HTTP Status Codes
HTTP status codes are three-digit codes sent by the server to indicate the result of a client's request.
They help the client understand whether the request was successful, failed, or requires some additional action.
Using appropriate status codes makes APIs easier to understand, consume, debug, and maintain.
Common Status Codes
Status Code	Meaning	Usage in Express
200 OK	Request successful	Data retrieved or updated successfully
201 Created	Resource created	New user/resource created
204 No Content	Successful with no response body	Resource deleted
400 Bad Request	Invalid request	Invalid client input
401 Unauthorized	Authentication required	User is not authenticated
403 Forbidden	Access denied	User does not have permission
404 Not Found	Resource not found	Requested resource does not exist
500 Internal Server Error	Server error	Unexpected error on server
## Using Status Codes in Express
200 – OK
Used when a request is successfully processed.
```js
res.status(200).json({
    message: "Success"
});
```
201 – Created
Used when a new resource has been successfully created.
```js
res.status(201).json({
    message: "User created"
});
```
204 – No Content
Used when the request succeeds but there is no response body to return.
```js
res.status(204).send();
```
A common use case is a successful DELETE operation.
400 – Bad Request
Used when the client sends invalid or incomplete data.
```js
res.status(400).json({
    error: "Invalid request"
});
```
401 – Unauthorized
Used when authentication is required or the provided authentication is invalid.
```js
res.status(401).json({
    error: "Authentication required"
});
```
403 – Forbidden
Used when the client is authenticated but does not have permission to access the resource.
```js
res.status(403).json({
    error: "Access denied"
});
```
404 – Not Found
Used when the requested resource or endpoint does not exist.
```js
res.status(404).json({
    error: "Resource not found"
});
```
500 – Internal Server Error
Used when an unexpected error occurs on the server.
```js
res.status(500).json({
    error: "Internal server error"
});
```
## Request Object
The Request Object (req) represents the HTTP request sent by the client to the Express server. It contains information about the request, such as the URL, route parameters, query parameters, request body, headers, and cookies.
Syntax:
```js
app.get('/', (req, res) => {
    // Access request data using req
});
```
**Request Object Properties**
`req.app`
It is useful when you need to access application-level properties or methods within a middleware function or route handler.
`req.body`
It is primarily used to access data submitted by a client (e.g., web browser, mobile app) to the server, typically through HTTP method like POST, PUT , or PATCH.
`req.cookies`
It contains cookies sent by the client in the request and is used with the cookie-parser middleware.
`req.ip`
It is the remote IP address of the request.
`req.path`
It contains the path part of the request url.
`req.route`
It contains the currently matched route.
`req.params`
It is an object containing properties mapped to the named route “parameters”
`req.query`
It allows you to access the query parameters from the URL of an incoming HTTP request.
`req.files`
It is an object that contains uploaded files sent through an HTTP request using multipart/form-data encoding when using file upload middleware.
`req.is()`
It returns the matching content-type if the incoming request's 'content-type' HTTP header field matches with the MIME type that has been specified by the type parameter & it returns null if the request has no body otherwise it returns false.
**Response Object**
The Response Object (res) is passed as the second parameter to the route handler. It is used to send responses such as HTML pages, JSON data, files, images, or status codes back to the client.
**Response Object Properties**
`res.app`
It holds a reference to the instance of the Express app that is using the middleware.
`res.append()`
It appends the specified value to the HTTP response header field & if the header is not already set then it creates the header with the specified value
`res.cookie()`
It is used to set a cookie with the specified name and value.
`res.get()`
It returns the current value of the specified response header(header).
`res.end()`
It ends the current response process.
`res.json()`
It is used to send a JSON response to a client.
`res.links()`
It allows you to include link headers in your HTTP responses.
`res.render()`
It is used to render a view template & send the resulting HTML to the client.
`res.location()`
It is used to set the Location HTTP response header to the specified path or URL.
`res.send()`
It is used to send a response to the client.
`res.set()`
It is used to set the response HTTP header field to value.
`res.status()`
It is used to set the HTTP status code for a response.
Methods to Send Request to Server
1. Client Sends a Request
The cycle starts when a clients - such as browser , mobile app or API testing tool(like postman)- sends an HTTP request to the server.
This request includes:
    HTTP method (e.g., GET, PUT, POST, DELETE)
    URL/EndPoint (e.g., /users, /products/1)
    Headers (e.g., content-type, authorization)
    Optional Data(like form-data, or JSON in the request body)
2. Express Receives the Request
Express.js listens for incoming requests on the specified routes and HTTP methods. When a matching route is found, it passes the request to the corresponding route handler.
filename: app.js
```js
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('App created successfully');
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```
3. Middleware Processing
Before reaching the router handler, the request can pass through one or more middleware functions. Middleware can modify the req (request) or perform actions like authentication , logging, or parsing data.
filename: app.js
```js
app.use((req, res, next) => {
    console.log("Request received");
    next();
});
```
4. Route Handler Executes
The matched route executes its callback function, where you can access request data using the req object and send a response using the res object.
filename: express.js
```js
const express = require('express');
const app= express();
app.get('/user',(req,res)=>{
    res.send('Data added Successfully!')
}).listen(8080,()=>{
    console.log('User Data Saved!')
})
```
To run the file use node `<filename>`
run file using node
run file using node
Output:
requestoutput
    Note: the output will run on localhost:8080/user, where /user will the user endpoint
5. Server Sends a Response
Using the res object , Express sends the response back to the client. You can send plain text, JSON , HTML or status code.
filename: app.js
```js
app.get('/success', (req, res) => {
    res.status(200).json({ message: "Success" });
});
```
6. Cycle Completes
Once the response is sent , the cycle ends. The client receives the result, and may act on it or display it to the user.
# 3_Deconstructing Incoming Data in Express.js
When a client sends an HTTP request to an Express server, the request can contain different types of information.
For example, a request may contain:
* A value identifying a particular resource
* Optional values used for filtering or searching
* Data that needs to be created or updated
Express provides different properties of the `req` object to access these values.
The commonly used properties are:
```text
req.params
req.query
req.body
```
For JSON request bodies, Express provides:
```js
express.json()
```
which parses the incoming JSON data and makes it available through `req.body`.
# 1. `req.params`
## Definition
`req.params` contains **named parameters extracted from the URL path**.
A route parameter is represented using `:` in an Express route.
```js
app.get("/users/:id", (req, res) => {
    // req.params
});
```
The parameter represents a value that is part of the resource's URL.
### Why is it used?
`req.params` is mainly used when the client needs to identify a **specific resource**.
Common use cases include:
* Identifying a user
* Identifying a product
* Identifying an order
* Identifying a particular record
Conceptually:
```text
URL
 ↓
/users/:id
       ↓
   req.params
```
If a route contains multiple parameters, Express makes all of them available through `req.params`.
```js
const { userId, orderId } = req.params;
```
### Important Point
Route parameters are generally considered **part of the resource path**, rather than optional filtering information.
# 2. `req.query`
## Definition
`req.query` contains **parameters provided in the query string of a URL**.
Query parameters appear after `?`.
```text
/resource?key=value
```
Multiple query parameters are separated using `&`.
```text
/resource?key1=value1&key2=value2
```
Express makes these values available through:
```js
req.query
```
### Why is it used?
Query parameters are mainly used when the client wants to control **how a resource is retrieved or processed**.
Common use cases include:
* Filtering
* Searching
* Sorting
* Pagination
* Optional conditions
Conceptually:
```text
URL
 ↓
?filter=value
 ↓
req.query
```
For example, an API may allow the client to request a particular page or filter without changing the main resource path.
```js
const { page, limit } = req.query;
```
### Important Point
Unlike route parameters, query parameters are generally **optional** and provide additional instructions or conditions for processing the request.
# 3. `req.body`
## Definition
`req.body` contains data sent by the client in the **HTTP request body**.
The request body is commonly used with:
```text
POST
PUT
PATCH
```
These methods often send data to the server for creating or modifying resources.
A request body can contain different formats depending on the content type.
One of the most commonly used formats in REST APIs is JSON.
Conceptually:

```text
Client
  ↓
Request Body
  ↓
Express Middleware
  ↓
req.body
```
### Why is it used?
`req.body` is used when the client needs to send **actual data to the server**.
Typical use cases include:
* Creating a user
* Updating profile information
* Submitting a form
* Creating an order
* Sending application data
# 4. `express.json()`
## Definition
`express.json()` is Express middleware that **parses incoming JSON request bodies**.
It is registered using:
```js
app.use(express.json());
```
### Why is it used?
When a client sends JSON data, the server needs to parse that data before application code can conveniently access it.
The middleware performs this processing:
```text
Incoming HTTP Request
        ↓
   JSON Payload
        ↓
 express.json()
        ↓
 Parsed JavaScript Object
        ↓
     req.body
```
Without the appropriate body-parsing middleware, JSON data may not be available through `req.body`.
### Example Syntax
```js
const express = require("express");
const app = express();
app.use(express.json());
```
After this middleware is registered, JSON request bodies can be accessed through:
```js
req.body
```
# 5. Destructuring Incoming Data
Once the request data is available, JavaScript destructuring can be used to extract only the required values.
Instead of repeatedly accessing properties:
```js
req.params.id
req.query.page
req.body.name
```
they can be extracted into variables:
```js
const { id } = req.params;
const { page } = req.query;
const { name } = req.body;
```
This makes request-handling code easier to read and reduces repeated property access.
# 6. Where Each Type of Data Comes From
The three commonly used request properties represent different parts of an HTTP request.
```text
                 HTTP REQUEST
                      |
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    URL Path      Query String    Body
        |             |             |
        ↓             ↓             ↓
   req.params     req.query      req.body
```
### `req.params`
Represents:
```text
Resource identification
```
### `req.query`
Represents:
```text
Optional request conditions
```
### `req.body`
Represents:
```text
Data being sent to the server
```
# 7. Params vs Query vs Body

| Property     | Data Location     | Main Purpose                              |
| ------------ | ----------------- | ----------------------------------------- |
| `req.params` | URL path          | Identify a specific resource              |
| `req.query`  | URL query string  | Filtering, searching, sorting, pagination |
| `req.body`   | HTTP request body | Send data to create or modify a resource  |

A useful way to remember them:
```text
params → Which resource?
query  → How should I retrieve/process it?
body   → What data am I sending?
```
# 8. Request Data Processing Flow
When an Express server receives a request, the data can be processed as follows:
```text
Client
  ↓
HTTP Request
  ↓
Express
  ↓
┌─────────────────────────────┐
│ URL Parameters → req.params │
│ Query Parameters → req.query│
│ JSON Body → req.body        │
└─────────────────────────────┘
  ↓
Route Handler
  ↓
Application Logic
  ↓
Response
```
This separation allows an API to clearly distinguish between:
* **Resource identification**
* **Request options**
* **Data being submitted**
# 9. Key Points
* `req` represents the incoming HTTP request.
* `req.params` accesses values defined as URL route parameters.
* `req.query` accesses values supplied through the URL query string.
* `req.body` accesses data sent inside the HTTP request body.
* `express.json()` parses JSON request payloads.
* `express.json()` should be registered before routes that need to process JSON bodies.
* `req.params` is commonly used for resource identification.
* `req.query` is commonly used for filtering, searching, sorting, and pagination.
* `req.body` is commonly used for creating and updating data.
* JavaScript destructuring can make extracted request data easier to work with.
# 4_Structuring Routes Using `express.Router()`
As an Express application grows, keeping all routes inside a single `app.js` file can make the application difficult to maintain.
For example, an application may contain routes for:
```text
Users
Products
Orders
Authentication
Payments
```
Instead of defining all these routes directly in the main application file, Express provides **`express.Router()`** to divide routes into separate modules.
## 1. What is `express.Router()`?
`express.Router()` creates a **separate router instance** that can contain its own routes and middleware.
It allows related routes to be grouped together and then mounted under a common path.
```js
const router = express.Router();
```
The router can then define routes using:
```js
router.get(...)
router.post(...)
router.put(...)
router.patch(...)
router.delete(...)
```
The main application can mount the router using:
```js
app.use("/api/v1/users", userRouter);
```
## 2. Why Use `express.Router()`?
Using routers provides a way to **organize an Express application by responsibility**.
Without routers:
```text
app.js
 ├── user routes
 ├── product routes
 ├── order routes
 ├── authentication routes
 └── payment routes
```
As the application grows, this can result in a large and difficult-to-maintain file.
With routers:
```text
app.js
   |
   ├── users router
   ├── products router
   ├── orders router
   └── auth router
```
Each router manages a particular group of related endpoints.
# 3. Route Segmentation
A common API structure is to organize routes using a common prefix.
For example:
```text
/api/v1/users
/api/v1/products
```
Here:
```text
/api
```
identifies the API.
```text
/v1
```
represents the API version.
```text
/users
/products
```
identifies the resource.
This creates a predictable API structure.
# 4. Router-Level Paths
A router can contain only the part of the path specific to that resource.
For example, the users router can define:
```js
router.get("/");
router.post("/");
router.get("/:id");
router.delete("/:id");
```
The main application can mount it at:
```js
app.use("/api/v1/users", userRouter);
```
Express combines the two paths.
Conceptually:
```text
Application Prefix
        +
Router Path
        =
Complete Endpoint
```
Therefore:
```text
/api/v1/users
```
and:
```text
/api/v1/users/:id
```
are produced without writing the complete path repeatedly inside the router.
# 5. User Router
A separate router file can be created for user-related operations.
**`routes/userRoutes.js`**
```js
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.json({ message: "Users" });
});
router.post("/", (req, res) => {
    res.json({ message: "Create user" });
});
router.get("/:id", (req, res) => {
    res.json({ message: "Get user" });
});
module.exports = router;
```
The router contains only **user-related routes**.
# 6. Product Router
Product-related routes can be kept separately.
**`routes/productRoutes.js`**
```js
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.json({ message: "Products" });
});
router.post("/", (req, res) => {
    res.json({ message: "Create product" });
});
router.get("/:id", (req, res) => {
    res.json({ message: "Get product" });
});
module.exports = router;
```
Now user and product responsibilities are separated.
# 7. Mounting Routers in the Main Application
The main `app.js` file imports the routers and attaches them to their base paths.
**`app.js`**
```js
const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
```
The main application now acts as the place where route modules are connected.
# 8. Resulting API Structure
The router prefixes are combined with the routes defined inside each router.
### Users
```text
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/:id
```
### Products
```text
GET    /api/v1/products
POST   /api/v1/products
GET    /api/v1/products/:id
```
The router does not need to repeat:
```text
/api/v1/users
```
for every user route.
# 9. Folder Structure
A clean Express application can be organized as:
```text
project/
│
├── app.js
│
├── routes/
│   ├── userRoutes.js
│   └── productRoutes.js
│
└── package.json
```
For a larger application, the structure can grow further:
```text
project/
│
├── app.js
│
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
│
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   └── orderController.js
│
├── services/
│
├── models/
│
└── package.json
```
This allows different responsibilities to be separated instead of placing the complete application inside one file.
# 10. API Versioning
The `/v1` part of the path represents an **API version**.
For example:
```text
/api/v1/users
```
Later, a new version can be introduced:
```text
/api/v2/users
```
Versioning allows an API to evolve while keeping an older API version available for existing clients.
Conceptually:
```text
/api
  │
  ├── v1
  │    ├── users
  │    └── products
  │
  └── v2
       ├── users
       └── products
```
The exact versioning strategy depends on the application's requirements.
# 11. Benefits of `express.Router()`
### Separation of concerns
Related routes are kept together.
### Maintainability
Changes to user routes can be made without modifying unrelated product or order routes.
### Reusability
A router can be mounted at a specific base path and reused as part of the application structure.
### Scalability
New resource groups can be added without continuously expanding `app.js`.
### Middleware Organization
Middleware can also be applied specifically to a router instead of the entire application.
```js
router.use(authMiddleware);
```
This is useful when only certain groups of routes require authentication or other processing.
# 12. Overall Structure
```text
                    Express Application
                           |
                          app.js
                           |
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
     User Router      Product Router    Order Router
          |                |                |
     /api/v1/users   /api/v1/products  /api/v1/orders
          |                |                |
       Routes            Routes           Routes
```
`express.Router()` therefore provides a clean way to **split a large Express application's routes into smaller, resource-specific modules while keeping the final API paths organized and consistent**.
# Module 3
This module is about controlling what happens to an HTTP request before it reaches the actual business logic.
In the Task Manager API, a request should not directly jump from:
```text
Client → Controller → Database
```
A better structure is:
```text
Client
   ↓
Application Middleware
   ↓
Router Middleware
   ↓
Authentication
   ↓
Validation
   ↓
Controller
   ↓
Service / Database
   ↓
Response
```
If something goes wrong at any stage, the error should move to one central error handler instead of every route creating its own error response.
### Main Idea
* Middleware controls the journey
* Validation controls what data is allowed inside
* `res.locals` carries request-specific information
* Custom errors describe expected failures
* Centralized error handling controls the final error response
# 1. What Express Middleware Is
Middleware is a function that runs between receiving a request and sending the final response.
A middleware normally receives:
```js
(req, res, next)
```
It can:
* Inspect the request
* Modify request or response-related data
* Perform authentication
* Validate input
* Log information
* Stop the request and send a response
* Pass control to the next middleware
* Pass an error to the error-handling middleware
A simple mental model is a series of checkpoints.
When a user creates a task:
```text
Request
   ↓
Is request JSON?
   ↓
Is user authenticated?
   ↓
Is task data valid?
   ↓
Create task
   ↓
Send response
```
Each checkpoint can be middleware.
In the Task Manager API, instead of putting authentication and validation directly inside the controller, they can be kept as separate middleware.
```js
router.post(
    "/",
    authenticate,
    validate(createTaskSchema),
    createTask
);
```
This makes the controller responsible mainly for creating the task rather than checking everything that happened before it.
# 2. `req`, `res`, `next`
## `req`
`req` represents the incoming HTTP request.
It contains information sent by the client.
Common properties:
```js
req.params
req.query
req.body
req.headers
req.method
req.path
```
For:
```text
POST /tasks/42?notify=true
```
I might access:
```js
req.params.id
req.query.notify
req.body
req.headers.authorization
```
Example:
```js
router.get("/tasks/:id", (req, res) => {
    console.log(req.params.id);
});
```
## `res`
`res` represents the response that the server sends back.
Common methods:
```js
res.status()
res.json()
res.send()
res.end()
```
Example:
```js
res.status(201).json({
    message: "Task created"
});
```
Once the response is sent, the request lifecycle normally ends.
## `next`
`next` tells Express to continue to the next middleware.
```js
function logger(req, res, next) {
    console.log(req.method, req.path);
    next();
}
```
Without `next()` or a response, the request can remain hanging.
A middleware has two basic choices:
```text
Do something and continue
        ↓
      next()
```
OR
```text
Do something and finish
        ↓
   res.json(...)
```
# 3. `next()` and Middleware Flow
Middleware executes in the order in which Express receives it.
```js
app.use(first);
app.use(second);
app.use(third);
```
The flow is:
```text
Request
   ↓
first
   ↓ next()
second
   ↓ next()
third
   ↓
Route
```
For the Task Manager API:
```js
router.post(
    "/",
    authenticate,
    validate(createTaskSchema),
    createTask
);
```
The execution is:
```text
POST /tasks
   ↓
authenticate
   ↓ next()
validate
   ↓ next()
createTask
   ↓
response
```
If `authenticate` rejects the request:
```js
return next(
    new AppError("Authentication required", 401)
);
```
then `validate` and `createTask` are not executed.
This is important because validation or database operations should not happen after authentication has already failed.
# Middleware Execution Order
Express does not automatically decide which middleware should run first.
The order in which middleware is registered determines the execution order.
For example:
```js
app.use(express.json());
app.use(requestLogger);
app.use("/api/tasks", taskRouter);
```
The request first passes through:
```text
express.json()
      ↓
requestLogger
      ↓
taskRouter
```
If I accidentally place the router before a required middleware:
```js
app.use("/api/tasks", taskRouter);
app.use(authenticate);
```
the authentication middleware may never protect those routes because the router can finish the request before Express reaches the later middleware.
A useful rule is:
```text
General middleware
        ↓
Security / Authentication
        ↓
Router
        ↓
Route-specific middleware
        ↓
Controller
        ↓
Error handler
```
The exact structure can vary, but the dependency order matters.
# 4. Application-Level Middleware
Application-level middleware is attached to the main Express application.
```js
app.use(...)
```
These are usually things that apply to many or all routes.
Example:
```js
app.use(express.json());
```
This allows Express to parse JSON request bodies.
For the Task Manager API, I can also have:
```js
app.use(requestLogger);
app.use(express.json());
app.use("/api/tasks", taskRouter);
app.use(errorHandler);
```
A request such as:
```text
POST /api/tasks
```
passes through application-level middleware before reaching the task router.
### Typical Uses
* JSON parsing
* Request logging
* CORS
* Security headers
* Global request IDs
* Global error handling
I should not put task-specific logic into application middleware if it is only relevant to `/tasks`.
# 5. Router-Level Middleware
Router-level middleware is attached to an Express router.
```js
const router = express.Router();
router.use(...);
```
Suppose my API has:
```text
/api/tasks
/api/users
/api/comments
```
A middleware that applies only to task routes can live inside the task router.
```js
const taskRouter = express.Router();

taskRouter.use(authenticate);

taskRouter.get("/", getTasks);

taskRouter.post(
    "/",
    validate(createTaskSchema),
    createTask
);
```
Now authentication applies to the task router.
The structure becomes:
```text
Application
    ↓
/api/tasks router
    ↓
authenticate
    ↓
task route
```
This is cleaner than putting task-specific middleware globally.
# 6. Route-Level Middleware
Route-level middleware is attached directly to a specific route.
```js
router.post(
    "/",
    authenticate,
    validate(createTaskSchema),
    createTask
);
```
Here:
```text
authenticate
     ↓
validate
     ↓
createTask
```
are part of that route's pipeline.
This is useful when different routes need different rules.
For example:
```js
router.get(
    "/",
    authenticate,
    getTasks
);
router.post(
    "/",
    authenticate,
    validate(createTaskSchema),
    createTask
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteTask
);
```

The delete operation has an additional authorization requirement.

This avoids putting every rule into every controller.
# 7. Custom Middleware
Custom middleware is middleware that I write for application-specific behavior.
### Authentication Middleware
```js
function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return next(
            new AppError("Authentication required", 401)
        );
    }

    // verify token

    next();
}
```
### Request Logging Middleware
```js
function requestLogger(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
}
```
The important design principle is that one middleware should have one clear responsibility.
### Bad
```js
function everything(req, res, next) {
    // authenticate
    // validate
    // load database user
    // check permissions
    // create task
}
```
### Better
```text
authenticate
     ↓
authorize
     ↓
validate
     ↓
controller
```
This makes individual pieces easier to test and reuse.
# 8. `res.locals`
`res.locals` stores data that belongs to the current request/response cycle.
For example, after authentication I may know which user is making the request.
```js
res.locals.user = user;
```
The next middleware can access:
```js
res.locals.user
```
The controller can also access it.
Example:
```js
function authenticate(req, res, next) {
    const user = verifyToken(
        req.headers.authorization
    );

    if (!user) {
        return next(
            new AppError("Invalid token", 401)
        );
    }

    res.locals.user = user;

    next();
}
```
Then:
```js
async function createTask(req, res, next) {
    const user = res.locals.user;

    const task = await Task.create({
        title: req.body.title,
        ownerId: user.id
    });

    res.status(201).json(task);
}
```
This is useful because the authenticated user is tied to the current request.
I do not want to put request-specific users into a global variable:
```js
let currentUser;
```
That would be unsafe when multiple users make requests concurrently.
# 9. Request-Scoped State
Request-scoped state means data that belongs only to one request.
Suppose two users make requests at almost the same time:
```text
Request A → Gowtham
Request B → Arun
```
The server must not accidentally mix their information.
With:
```js
res.locals.user
```
each request gets its own state.
```text
Request A
res.locals.user → Gowtham
Request B
res.locals.user → Arun
```
This is why request-specific data should not be stored in global variables.
For the Task Manager API, request-scoped state could contain:
```js
res.locals.user
res.locals.requestId
res.locals.permissions
```
The exact values depend on the application.
# 10. Middleware Chaining
Middleware chaining means multiple middleware functions are executed one after another.
Example:
```js
router.post(
    "/",
    authenticate,
    authorize("manager"),
    validate(createTaskSchema),
    createTask
);
```
The flow is:
```text
Request
   ↓
authenticate
   ↓
authorize
   ↓
validate
   ↓
createTask
   ↓
Response
```
Each middleware decides whether the request is allowed to continue.
This creates a pipeline where each stage handles one concern.
```text
Authentication
      ↓
Authorization
      ↓
Validation
      ↓
Business Logic
```
If authorization fails:
```js
return next(
    new AppError(
        "You do not have permission",
        403
    )
);
```
the validation and controller should not execute.
# 11. `next(error)`
`next()` means:
```text
Continue normally
```
`next(error)` means:
```text
Something went wrong.
Send this error through the error-handling pipeline.
```
Example:
```js
function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return next(
            new AppError(
                "Authentication required",
                401
            )
        );
    }
    next();
}
```
I should return after calling `next(error)` when there is no more work to perform.
```js
return next(error);
```
This prevents accidental execution of code below it.
The important difference is:
```js
next();
```
means:
```text
Continue request
```
while:
```js
next(error);
```
means:
```text
Skip normal middleware
        ↓
Move toward error handling
```
# 12. Global Error-Handling Middleware
Instead of every controller producing its own error format, I can create one centralized error handler.
Express recognizes error-handling middleware because it has four parameters:
```js
function errorHandler(err, req, res, next) {
    // ...
}
```
Example:
```js
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message
    });
}
```
Then register it after the routes:
```js
app.use("/api/tasks", taskRouter);
app.use(errorHandler);
```
A task controller can simply do:
```js
return next(
    new AppError(
        "Task not found",
        404
    )
);
```
The global error handler decides how the final response should look.
This gives the API a consistent error format.
Example response:
```json
{
    "success": false,
    "message": "Task not found"
}
```
# 13. `AppError`

JavaScript's normal `Error` tells me that something failed, but for an API I usually also need information such as HTTP status code.

Instead of repeatedly creating objects like:

```js
const error = new Error("Task not found");

error.statusCode = 404;
```

I can create an application-specific error class.

```js
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;
    }
}
```

Now I can write:

```js
throw new AppError(
    "Task not found",
    404
);
```

or:

```js
return next(
    new AppError(
        "Authentication required",
        401
    )
);
```

The error handler can use:

```js
err.statusCode
err.message
err.isOperational
```

This gives the application a consistent way to represent expected API failures.

---

# 14. Operational vs Unexpected Errors

Not every error means the same thing.

## Operational Errors

These are expected situations that the application knows how to handle.

Examples from the Task Manager API:

```text
Task does not exist       → 404
Missing authentication    → 401
User has no permission    → 403
Invalid request data      → 400
```

These can be represented with:

```js
new AppError(
    "Task not found",
    404
);
```

The server itself is still functioning normally.

---

## Unexpected Errors

These indicate a programming or infrastructure problem.

For example:

```js
const task = undefined;

console.log(task.owner.id);
```

This can produce a runtime error.

Other examples:

* Unexpected database failure
* Programming bug
* Incorrect assumption in code
* Unavailable external dependency

I should not expose internal details such as stack traces to normal API clients.

The client might receive:

```json
{
    "success": false,
    "message": "Internal server error"
}
```

while the actual stack trace is logged on the server.

---

# 15. HTTP Status Codes for Errors

Status codes communicate what happened to the client.

Common ones for the Task Manager API:

| Status Code | Meaning               | Example                     |
| ----------- | --------------------- | --------------------------- |
| `400`       | Bad Request           | Invalid request data        |
| `401`       | Unauthorized          | Authentication missing      |
| `403`       | Forbidden             | User has no permission      |
| `404`       | Not Found             | Task does not exist         |
| `409`       | Conflict              | Resource already exists     |
| `422`       | Unprocessable Entity  | Semantic validation failure |
| `500`       | Internal Server Error | Unexpected server failure   |

## 400 Bad Request

The request itself is invalid.

Example:

```text
POST /tasks
```

with malformed or unacceptable request data.

---

## 401 Unauthorized

The client has not successfully authenticated.

Example:

```text
Authorization header missing
```

---

## 403 Forbidden

The user is authenticated but does not have permission.

Example:

```text
Normal user trying to perform an admin-only operation
```

---

## 404 Not Found

The requested resource does not exist.

Example:

```text
GET /tasks/9999
```

when task `9999` does not exist.

---

## 409 Conflict

The request conflicts with the current state.

Example:

```text
Trying to create a task with a unique identifier
that already exists
```

---

## 422 Unprocessable Entity

The request has the correct general structure, but the supplied values fail semantic validation.

The exact use of `400` vs `422` should be consistent with the API's chosen convention.

---

## 500 Internal Server Error

Something unexpected happened on the server.

I should not use `500` for normal client mistakes.

---

# 16. Async Error Handling

Controllers often perform asynchronous operations:

```js
async function getTask(req, res, next) {
    const task = await Task.findById(
        req.params.id
    );

    res.json(task);
}
```

But the database operation can fail.

For example:

```js
async function getTask(req, res, next) {
    try {
        const task = await Task.findById(
            req.params.id
        );

        if (!task) {
            return next(
                new AppError(
                    "Task not found",
                    404
                )
            );
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
}
```

The important part is that the asynchronous failure eventually reaches the centralized error handler.

A reusable async wrapper can reduce repeated `try/catch` blocks:

```js
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(
            fn(req, res, next)
        ).catch(next);
    };
};
```

Then:

```js
router.get(
    "/:id",
    asyncHandler(getTask)
);
```

Now unexpected asynchronous errors are forwarded to:

```text
asyncHandler
     ↓
next(error)
     ↓
global errorHandler
```

Whether I use a wrapper depends on the Express version and project style, but the underlying principle stays the same:

> Async failures must reach the centralized error pipeline.

---

# 17. Why Input Validation Is Necessary

Anything coming from the client should be treated as untrusted input.

Suppose my Task Manager expects:

```json
{
    "title": "Finish API module",
    "description": "Complete middleware implementation",
    "priority": "high"
}
```

A client could send:

```json
{
    "title": 123,
    "description": true,
    "priority": "whatever"
}
```

If I directly use this data:

```js
const task = await Task.create(req.body);
```

I am trusting the client to follow my API contract.

That is a mistake.

Validation creates a boundary:

```text
Untrusted Input
      ↓
Validation
      ↓
Trusted Application Data
      ↓
Business Logic
```

Validation should happen before the controller performs important business operations.

For the Task Manager API:

```text
POST /tasks
     ↓
Authentication
     ↓
Validate body
     ↓
Controller
     ↓
Database
```

This prevents invalid data from reaching deeper layers.

---

# 18. Zod / Joi Schemas

A schema describes what valid data should look like.

For example, using Zod:

```js
import { z } from "zod";

const createTaskSchema = z.object({
    title: z.string().min(3).max(100),

    description: z
        .string()
        .max(500)
        .optional(),

    priority: z.enum([
        "low",
        "medium",
        "high"
    ])
});
```

This creates an explicit API contract.

Instead of explaining separately:

```text
title must be a string
title must have at least 3 characters
priority must be low/medium/high
```

the schema becomes the executable definition.

The same idea can be implemented using Joi.

The important concept is:

```text
Define expected shape
        ↓
Validate incoming data
        ↓
Reject invalid data
        ↓
Allow valid data into business logic
```

---

# 19. Required / Optional Fields

Suppose creating a task requires:

```text
title
priority
```

but `description` is optional.

A Zod schema can express that:

```js
const createTaskSchema = z.object({
    title: z.string(),

    priority: z.enum([
        "low",
        "medium",
        "high"
    ]),

    description: z
        .string()
        .optional()
});
```

Now:

```json
{
    "title": "Complete API",
    "priority": "high"
}
```

is valid.

But:

```json
{
    "priority": "high"
}
```

fails because `title` is required.

This is useful because different operations may have different schemas.

For example:

```text
Create Task → title required

Update Task → title optional
```

So I should not blindly reuse one schema for every operation.

---

# 20. Type Validation

The schema can verify that values have the expected types.

For example:

```js
const schema = z.object({
    title: z.string(),
    estimatedHours: z.number(),
    completed: z.boolean()
});
```

### Valid

```json
{
    "title": "Build middleware",
    "estimatedHours": 4,
    "completed": false
}
```

### Invalid

```json
{
    "title": 123,
    "estimatedHours": "four",
    "completed": "no"
}
```

This protects the controller from making assumptions such as:

```js
req.body.estimatedHours * 2
```

when the client actually supplied:

```text
"four"
```

Validation establishes the expected type before business logic uses the value.

---

# 21. String / Number / Email Validation

Validation is not limited to checking types.

I can also check constraints.

Example:

```js
const userSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(50),

    age: z
        .number()
        .int()
        .min(18)
        .max(100),

    email: z.string().email()
});
```

Here:

```text
name
→ string
→ 2–50 characters

age
→ number
→ integer
→ 18–100

email
→ valid email format
```

For the Task Manager API, similar rules can be applied to:

* Task title
* Task description
* Priority
* Due date
* Estimated hours

The important thing is to validate according to the actual business rule, not just add random restrictions.

---

# 22. Nested Object / Array Validation

Real APIs rarely contain only flat data.

For example, a task could contain labels:

```json
{
    "title": "Build API",
    "labels": [
        {
            "name": "backend",
            "color": "blue"
        },
        {
            "name": "express",
            "color": "green"
        }
    ]
}
```

The schema can describe the nested structure.

```js
const labelSchema = z.object({
    name: z.string().min(1),
    color: z.string().min(1)
});

const createTaskSchema = z.object({
    title: z.string().min(3),

    labels: z
        .array(labelSchema)
        .optional()
});
```

Now validation happens recursively.

The API can verify:

```text
labels
   ↓
array
   ↓
each item
   ↓
object
   ↓
name + color
```

This becomes especially important when API payloads become more complex.

---

# 23. Validation Middleware

Instead of writing validation directly inside every controller, I can create reusable middleware.

Example:

```js
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(
            req.body
        );

        if (!result.success) {
            return next(
                new AppError(
                    "Invalid request data",
                    400
                )
            );
        }

        res.locals.validatedBody =
            result.data;

        next();
    };
}
```

Then my route becomes:

```js
router.post(
    "/",
    authenticate,
    validate(createTaskSchema),
    createTask
);
```

The controller does not need to repeat validation logic.

A more complete implementation can preserve structured validation details:

```js
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(
            req.body
        );

        if (!result.success) {
            const error = new AppError(
                "Validation failed",
                400
            );

            error.details =
                result.error.issues;

            return next(error);
        }

        res.locals.validatedBody =
            result.data;

        next();
    };
}
```

Now the global error handler can decide how much validation information should be returned.

---

# 24. Connecting Validation → Controller → Error Handler

This is the most important part of the module.

The complete Task Manager flow can look like this:

```js
router.post(
    "/",
    authenticate,
    validate(createTaskSchema),
    createTask
);
```

## Step 1 — Authentication

```js
function authenticate(req, res, next) {
    const token =
        req.headers.authorization;

    if (!token) {
        return next(
            new AppError(
                "Authentication required",
                401
            )
        );
    }

    const user = verifyToken(token);

    if (!user) {
        return next(
            new AppError(
                "Invalid token",
                401
            )
        );
    }

    res.locals.user = user;

    next();
}
```

The authenticated user is now available to later middleware.

```js
res.locals.user
```

---

## Step 2 — Validation

```js
const createTaskSchema = z.object({
    title: z
        .string()
        .min(3)
        .max(100),

    description: z
        .string()
        .max(500)
        .optional(),

    priority: z.enum([
        "low",
        "medium",
        "high"
    ])
});
```

Validation middleware:

```js
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(
            req.body
        );

        if (!result.success) {
            const error = new AppError(
                "Validation failed",
                400
            );

            error.details =
                result.error.issues;

            return next(error);
        }

        res.locals.validatedBody =
            result.data;

        next();
    };
}
```

Now only validated data moves forward.

---

## Step 3 — Controller

The controller can focus on the actual task creation.

```js
async function createTask(req, res, next) {
    try {
        const user = res.locals.user;
        const data =
            res.locals.validatedBody;

        const task = await Task.create({
            ...data,
            ownerId: user.id
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}
```

Notice that the controller does not need to ask:

```text
Is the user authenticated?
Is title a string?
Is priority valid?
```

Those responsibilities already belong to earlier stages.

---

## Step 4 — Error Handler

Finally:

```js
function errorHandler(
    err,
    req,
    res,
    next
) {
    const statusCode =
        err.statusCode || 500;

    res.status(statusCode).json({
        success: false,

        message:
            statusCode === 500
                ? "Internal server error"
                : err.message,

        ...(err.details && {
            details: err.details
        })
    });
}
```

Registered once:

```js
app.use(errorHandler);
```

The complete flow is now:

```text
POST /api/tasks
       ↓
authenticate
       ↓
Valid user?
   ┌───┴───┐
  No      Yes
  ↓        ↓
 401     validate
           ↓
      Valid payload?
       ┌───┴───┐
      No      Yes
      ↓        ↓
     400    createTask
                ↓
             database
                ↓
               201
```

Any unexpected error:

```text
Unexpected error
       ↓
next(error)
       ↓
global errorHandler
       ↓
500
```
The important separation is:

| Component     | Responsibility                                |
| ------------- | --------------------------------------------- |
| Route         | Decides which middleware pipeline is required |
| Middleware    | Handles cross-cutting request concerns        |
| Schema        | Defines valid input                           |
| Controller    | Handles the actual request operation          |
| `AppError`    | Represents expected application failures      |
| Error Handler | Converts errors into HTTP responses           |

# The Mental Model to Remember
Think of an Express API as a controlled pipeline.
```text
             REQUEST
                |
    ┌─────────────────────┐
    │ Application          │
    │ Middleware           │
    └──────────┬──────────┘
               |
    ┌─────────────────────┐
    │ Router Middleware   │
    └──────────┬──────────┘
               |
    ┌─────────────────────┐
    │ Authentication      │
    └──────────┬──────────┘
               |
    ┌─────────────────────┐
    │ Validation          │
    └──────────┬──────────┘
               |
    ┌─────────────────────┐
    │ Controller          │
    └──────────┬──────────┘
               |
    ┌─────────────────────┐
    │ Database / Service  │
    └──────────┬──────────┘
               |
            RESPONSE

   Any stage can produce:
               |
          next(error)
               |
    ┌─────────────────────┐
    │ Global Error Handler │
    └──────────┬──────────┘
               |
          ERROR RESPONSE
```
## Key Implementation Rule
Don't make the controller responsible for everything.
Instead:
```text
Authentication
      ↓
authenticate middleware
Authorization
      ↓
authorize middleware

Validation
      ↓
validation middleware

Request State
      ↓
res.locals

Business Logic
      ↓
controller / service

Expected Errors
      ↓
AppError

Error Response
      ↓
global error handler
```
That separation is what makes the Task Manager POC start looking like an actual backend architecture rather than a collection of routes.

# MODULE4
# Database Modeling in Node.js 
## 1. Relational vs Non-Relational Databases

There are two major ways of storing application data.

### Relational Database — SQL

Examples:

* PostgreSQL
* MySQL
* SQL Server
* Oracle

Data is stored in **tables**.

Example:

```text
Users
------------------------------------------------
id | name   | email
1  | Vaishu | vaishu@gmail.com
2  | Arun   | arun@gmail.com
```

```text
Products
--------------------------------
id | name   | price | stock
1  | Laptop | 55000 | 10
2  | Mouse  | 800   | 20
```

Relationships are usually created using **foreign keys**.

```text
Users
  |
  | user_id
  ↓
Orders
```

### Why use SQL?

Use SQL when:

* Data has a fixed structure.
* Relationships are important.
* Transactions are critical.
* You need complex joins and reporting.
* Data consistency is a high priority.

---

# 2. Non-Relational Database — NoSQL

Examples:

* MongoDB
* Redis
* Cassandra
* DynamoDB

MongoDB stores data as **documents** rather than rows.

Example:

```json
{
    "_id": "101",
    "name": "Vaishu",
    "email": "vaishu@gmail.com"
}
```

A collection is similar to a table:

```text
MongoDB Database
│
├── users
├── products
└── orders
```

### Why use NoSQL?

Use NoSQL when:

* Data structure can change.
* You want flexible schemas.
* JSON-like data is convenient.
* You need to scale horizontally.
* Your application naturally works with documents.

---

# 3. SQL vs NoSQL

| Feature         | SQL                | NoSQL                         |
| --------------- | ------------------ | ----------------------------- |
| Storage         | Tables             | Documents/collections         |
| Structure       | Fixed/schema-based | Flexible                      |
| Relationships   | Foreign keys       | References/embedded documents |
| Joins           | `JOIN`             | `populate()` / aggregation    |
| Transactions    | Strong support     | Supported in MongoDB          |
| Example         | PostgreSQL         | MongoDB                       |
| Node.js library | Prisma/Sequelize   | Mongoose                      |

A simple way to remember:

```text
SQL
Table → Row → Column → Foreign Key

MongoDB
Collection → Document → Field → Reference
```

---

# 4. What is an ODM?

**ODM = Object Document Mapper**

Mongoose is an ODM for MongoDB.

Without Mongoose, you communicate with MongoDB directly.

With Mongoose:

```text
Node.js
   ↓
Mongoose
   ↓
MongoDB
```

Mongoose allows you to define:

* schemas
* models
* validation
* relationships
* middleware
* queries
* population

Example:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", userSchema);
```

Now:

```js
const user = await User.create({
    name: "Vaishu",
    email: "vaishu@gmail.com"
});
```

---

# 5. What is an ORM?

**ORM = Object Relational Mapper**

ORMs are generally used with relational databases.

Popular Node.js ORMs:

```text
Prisma
Sequelize
TypeORM
```

For example:

```text
Node.js
   ↓
Prisma
   ↓
PostgreSQL
```

The equivalent MongoDB architecture is:

```text
Node.js
   ↓
Mongoose
   ↓
MongoDB
```

So:

```text
MongoDB → Mongoose → ODM

PostgreSQL/MySQL → Prisma/Sequelize → ORM
```

---

# 6. Mongoose POC

For your current project, use:

```text
EcommerceMongoDB/
│
├── app.js
├── .env
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
└── routes/
    ├── userRoutes.js
    ├── productRoutes.js
    └── orderRoutes.js
```

Install:

```bash
npm init -y
npm install express mongoose dotenv
```

---

# 7. Database Connection

### `.env`

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=3000
```

### `config/db.js`

```js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
```

---

# 8. Connection Event Listeners

Mongoose exposes connection events.

The important ones are:

```js
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
```

You can put them in `db.js`:

```js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

mongoose.connection.on("connected", () => {
    console.log("Database connection event triggered");
});

mongoose.connection.on("error", (error) => {
    console.error("Database error:", error.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
});

module.exports = connectDB;
```

### Why use events?

They help monitor the database connection.

```text
MongoDB connects
       ↓
"connected"
       ↓
Application continues

Connection fails
       ↓
"error"
       ↓
Log / handle problem

Connection closes
       ↓
"disconnected"
```

---

# 9. Connection Pooling

A Node.js application may receive many requests:

```text
Request 1 ──┐
Request 2 ──┤
Request 3 ──┼──→ MongoDB
Request 4 ──┤
Request 5 ──┘
```

Creating a completely new database connection for every request would be inefficient.

Instead, the MongoDB driver maintains a **connection pool**.

```text
             ┌── Connection 1
Node.js ─────┼── Connection 2
             ├── Connection 3
             ├── Connection 4
             └── Connection 5
                    ↓
                 MongoDB
```

Mongoose uses MongoDB driver's connection pooling.

You normally establish the connection **once when the application starts**, rather than connecting inside every route.

Bad:

```js
app.get("/users", async (req, res) => {

    await mongoose.connect(process.env.MONGO_URI);

    // query

});
```

Better:

```js
connectDB();

app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);

});
```

### Why?

Because the connection pool can reuse existing connections.

---

# 10. Schema

A schema defines the structure and rules of a MongoDB document.

Example:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("User", userSchema);
```

This gives us:

```text
User
│
├── name → String
└── email → String
```

---

# 11. One-to-Many Relationship

Example:

**One user can have many orders.**

```text
User
  │
  ├── Order 1
  ├── Order 2
  └── Order 3
```

User:

```js
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});
```

Order:

```js
const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    totalAmount: Number

});
```

The important part is:

```js
ref: "User"
```

It tells Mongoose that the ObjectId refers to a `User` document.

---

# 12. Population

Suppose the database contains:

### User

```json
{
    "_id": "U100",
    "name": "Vaishu",
    "email": "vaishu@gmail.com"
}
```

### Order

```json
{
    "_id": "O100",
    "user": "U100",
    "totalAmount": 55800
}
```

Normally:

```js
const orders = await Order.find();
```

You get:

```json
{
    "user": "U100",
    "totalAmount": 55800
}
```

But we can populate the user:

```js
const orders = await Order
    .find()
    .populate("user");
```

Now Mongoose replaces the reference with the user document:

```json
{
    "_id": "O100",
    "user": {
        "_id": "U100",
        "name": "Vaishu",
        "email": "vaishu@gmail.com"
    },
    "totalAmount": 55800
}
```

This is similar to a SQL join.

```text
MongoDB                    SQL

.populate("user")    ≈    JOIN users
```

---

# 13. Many-to-Many Relationship

Example:

A student can enroll in many courses.

A course can contain many students.

```text
Student A ── Course 1
          ├─ Course 2
          └─ Course 3

Student B ── Course 1
          └─ Course 3
```

One approach is to store arrays of references.

### Student

```js
const studentSchema = new mongoose.Schema({
    name: String,

    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
});
```

### Course

```js
const courseSchema = new mongoose.Schema({
    name: String
});
```

Now:

```js
const student = await Student
    .findById(studentId)
    .populate("courses");
```

Result:

```json
{
    "name": "Vaishu",
    "courses": [
        {
            "_id": "C1",
            "name": "Node.js"
        },
        {
            "_id": "C2",
            "name": "MongoDB"
        }
    ]
}
```

---

# 14. Indexing

Suppose you have:

```text
1,000,000 users
```

And you frequently search:

```js
User.findOne({
    email: "vaishu@gmail.com"
});
```

Without a suitable index, MongoDB may need to examine many documents.

Create an index:

```js
const userSchema = new mongoose.Schema({
    name: String,

    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
});
```

Now MongoDB can use an index for faster lookup.

### Why indexing?

```text
Without index

Query
 ↓
Check document 1
 ↓
Check document 2
 ↓
Check document 3
 ↓
...
 ↓
Find user
```

With index:

```text
Query
 ↓
Index
 ↓
Locate matching document
```

Common fields to consider indexing:

```text
email
username
product SKU
order status
createdAt
```

But don't index everything.

Indexes consume storage and can make writes more expensive because indexes also need to be updated.
# 15. Complete E-commerce Relationship
Your current E-commerce API can model relationships like this:
```text
             ┌──────────────┐
             │     User     │
             └──────┬───────┘
                    │
                    │ 1 : Many
                    ↓
             ┌──────────────┐
             │    Orders    │
             └──────┬───────┘
                    │
                    │ Many : Many
                    ↓
             ┌──────────────┐
             │   Products   │
             └──────────────┘
```
An order contains multiple products:
```json
{
    "user": "USER_ID",

    "items": [
        {
            "product": "LAPTOP_ID",
            "quantity": 2
        },
        {
            "product": "MOUSE_ID",
            "quantity": 1
        }
    ]
}
```
And you can populate both:
```js
const orders = await Order
    .find()
    .populate("user")
    .populate("items.product");
```
This is particularly useful for your E-commerce POC.
# 16. SQL Equivalent
The same E-commerce design in PostgreSQL could look like:
```text
users
----------------
id
name
email
products
----------------
id
name
price
stock
orders
----------------
id
user_id
total_amount
order_items
----------------
id
order_id
product_id
quantity
price
```
Relationships:
```text
users
  │
  │ 1:N
  ↓
orders
  │
  │ 1:N
  ↓
order_items
  │
  │ N:1
  ↓
products
```
SQL query:
```sql
SELECT
    users.name,
    orders.id,
    products.name,
    order_items.quantity
FROM orders
JOIN users
    ON orders.user_id = users.id
JOIN order_items
    ON orders.id = order_items.order_id
JOIN products
    ON order_items.product_id = products.id;
```

MongoDB equivalent concept:

```js
Order.find()
    .populate("user")
    .populate("items.product");
```
# MODULE5
## # Node.js Authentication, Authorization & API Security

This documentation covers the theory and practical concepts behind securing a Node.js/Express API using **bcrypt/Argon2, JWT, RBAC, Helmet, CORS, and express-rate-limit**.

---

# 1. Secure Password Hashing

## What is Password Hashing?

Password hashing is the process of converting a user's password into a fixed-format **one-way hash** before storing it in a database.

Instead of storing:

```text
Password:
Vaishu@123
```

the application stores something similar to:

```text
$2b$12$N9qo8uLOickgx2ZMRZoMye...
```

The original password cannot be obtained by simply reversing the hash.

### Why is password hashing used?

If an attacker obtains the database, plaintext passwords would immediately be exposed.

Hashing provides an additional layer of protection:

```text
User Password
      ↓
Password Hashing Algorithm
      ↓
Password Hash
      ↓
Database
```

During login:

```text
Entered Password
      ↓
Hash Verification
      ↓
Compare with Stored Hash
      ↓
Match / Reject
```

The application should **never decrypt a password hash**. Password hashing is designed for verification, not decryption.

---

# 2. Hashing vs Encryption

These concepts are different.

| Hashing                                        | Encryption                      |
| ---------------------------------------------- | ------------------------------- |
| One-way operation                              | Reversible with a key           |
| Used for passwords                             | Used for protecting data        |
| No decryption                                  | Can be decrypted                |
| Same password can be verified against its hash | Encrypted data can be recovered |
| bcrypt, Argon2                                 | AES, RSA                        |

For passwords, use a password-hashing algorithm rather than reversible encryption.

---

# 3. bcrypt

**bcrypt** is a password-hashing algorithm designed specifically to make password guessing computationally expensive.

It incorporates:

* a salt
* a configurable work factor
* repeated computational work

A bcrypt hash commonly looks like:

```text
$2b$12$........................
```

The structure contains information about the algorithm/version, cost, salt, and resulting hash.

## Why use bcrypt?

bcrypt is designed to slow down password-guessing attacks.

Without password hashing:

```text
Database
   ↓
password = Vaishu@123
```

With bcrypt:

```text
Database
   ↓
password = $2b$12$............
```

Even if the database is leaked, the attacker does not directly receive the original passwords.

---

# 4. bcrypt Work Factor

bcrypt has a **cost/work factor**.

Example:

```text
bcrypt(password, 12)
```

The value controls how much computational work is required.

Higher work factors generally increase the time required for:

* password hashing
* password verification
* password guessing attempts

This is useful because attackers may try large numbers of password guesses.

However, setting the cost excessively high also increases the load on your own authentication server.

### Important principle

The work factor should be:

> **As expensive as practical for your infrastructure while keeping legitimate authentication responsive.**

It should be benchmarked on the actual environment rather than choosing a value blindly.

---

# 5. Salt

A **salt** is a unique random value added to a password before hashing.

Conceptually:

```text
Password
   +
Random Salt
   ↓
Hash Function
   ↓
Password Hash
```

Suppose two users have:

```text
Password: hello123
```

Without a salt, they could potentially have identical hashes.

With unique salts:

```text
User A
hello123 + randomSaltA
        ↓
      hash A

User B
hello123 + randomSaltB
        ↓
      hash B
```

Therefore, identical passwords do not produce identical stored hashes.

Modern password-hashing libraries such as bcrypt and Argon2 handle salt generation as part of the hashing process.

---

# 6. Argon2

**Argon2** is a modern password-hashing algorithm designed to resist password-cracking attacks, particularly attacks using highly parallel hardware.

Argon2 has parameters controlling:

* memory usage
* computation time
* parallelism

This makes it **memory-hard**, meaning an attacker needs significant memory resources as well as CPU resources.

### Why use Argon2?

Modern attackers can use:

* GPUs
* specialized hardware
* large-scale parallel computation

Argon2 increases the resources required for large-scale password guessing.

---

# 7. bcrypt vs Argon2

| Feature                              | bcrypt      | Argon2              |
| ------------------------------------ | ----------- | ------------------- |
| Password hashing                     | Yes         | Yes                 |
| Salt support                         | Yes         | Yes                 |
| Configurable cost                    | Yes         | Yes                 |
| Memory-hard                          | Limited     | Yes                 |
| Resistant to modern hardware attacks | Good        | Strong              |
| Widely deployed                      | Very widely | Increasingly common |
| Node.js package                      | `bcrypt`    | `argon2`            |

### Which should you use?

For a new application, **Argon2id** is generally a strong choice when your available libraries and infrastructure support it.

bcrypt remains a very practical and widely supported choice, especially for existing systems and learning environments.

---

# 8. Password Verification

The application should not hash the supplied password and compare strings manually.

Instead, use the password-hashing library's verification function.

Conceptually:

```text
Login Password
      ↓
Password verification function
      ↓
Stored Hash
      ↓
Valid / Invalid
```

For bcrypt:

```js
await bcrypt.compare(password, storedHash);
```

The library extracts the necessary salt and cost information from the stored hash and performs the appropriate verification.

---

# 9. Password Security Best Practices

A secure authentication system should:

* Never store plaintext passwords.
* Never log passwords.
* Never place passwords inside JWT payloads.
* Use bcrypt or Argon2.
* Use a sufficiently strong work factor.
* Validate password requirements where appropriate.
* Rate-limit authentication attempts.
* Use HTTPS.
* Keep authentication secrets outside source code.
* Avoid exposing whether an email/account exists during login.
* Consider compromised-password checks for high-security applications.

---

# 10. JSON Web Token — JWT

**JWT = JSON Web Token**

JWT is a standardized token format commonly used for authentication and authorization.

It allows a server to issue a signed token that a client can present on subsequent requests.

Typical flow:

```text
Login
  ↓
Verify credentials
  ↓
Create JWT
  ↓
Send JWT to client
  ↓
Client sends JWT with future requests
  ↓
Server verifies JWT
```

---

# 11. Stateful vs Stateless Authentication

## Stateful Session

In a traditional stateful session:

```text
Client
  ↓
Session ID
  ↓
Server
  ↓
Session Store
```

The server stores information about the session.

For example:

```text
Session ID: ABC123
User: 1001
Role: admin
```

The client sends:

```text
ABC123
```

The server looks up the session.

---

## Stateless Authentication

With JWT:

```text
Client
   ↓
JWT
   ↓
Server
   ↓
Verify signature
```

The server does not need a traditional session record for every access token.

The token itself contains claims needed by the application, and the server verifies its signature.

### Why is JWT called stateless?

Because the server can validate a properly signed access token without looking up a corresponding server-side session for every request.

However, this does **not** mean the overall authentication system can never maintain state. Refresh tokens, revocation lists, logout mechanisms, or other security controls can introduce server-side state.

---

# 12. Structure of JWT

A JWT generally contains three Base64URL-encoded parts:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

They are separated by periods.

---

# 13. JWT Header

The header describes the token.

Example:

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

`alg` identifies the signing algorithm.

`typ` identifies the token type.

---

# 14. JWT Payload

The payload contains **claims**.

Example:

```json
{
    "sub": "12345",
    "role": "admin",
    "iat": 1791120000,
    "exp": 1791120900
}
```

Common claims include:

| Claim | Meaning                 |
| ----- | ----------------------- |
| `sub` | Subject/user identifier |
| `iat` | Issued-at time          |
| `exp` | Expiration time         |
| `iss` | Issuer                  |
| `aud` | Audience                |
| `nbf` | Not valid before        |

Applications can also use custom claims such as:

```json
{
    "role": "admin"
}
```

---

# 15. JWT Payload Is Not Encrypted

This is one of the most important JWT concepts.

JWT payloads are normally **encoded**, not encrypted.

Therefore, someone who possesses the token can decode the header and payload.

Do not put:

```json
{
    "password": "Vaishu@123"
}
```

inside a JWT.

Do not put sensitive secrets into the payload.

A JWT signature provides **integrity/authenticity**, not confidentiality.

---

# 16. JWT Signature

The signature protects the token against unauthorized modification.

Conceptually:

```text
Header
   +
Payload
   +
Signing Key
   ↓
Signature
```

When the token arrives:

```text
Header + Payload + Signature
          ↓
       Verify
          ↓
    Valid / Invalid
```

If an attacker changes:

```json
"role": "user"
```

to:

```json
"role": "admin"
```

the existing signature will no longer validate.

---

# 17. JWT Signing Keys

JWTs can be signed using:

### Symmetric signing

Example:

```text
HS256
```

The same secret is used to sign and verify the token.

```text
Signing Server
      ↓
  SECRET KEY
      ↓
    JWT
      ↓
  SECRET KEY
      ↓
Verification Server
```

The secret must remain confidential.

---

### Asymmetric signing

Examples:

```text
RS256
ES256
```

These use a key pair:

```text
Private Key → signs token

Public Key → verifies token
```

This is useful when multiple services need to verify tokens without receiving the private signing key.

### Important principle

The private/signing key or symmetric secret must never be exposed to clients.

---

# 18. JWT Shelf Life

JWTs should have an explicit expiration time.

The `exp` claim defines when the token becomes invalid.

Example conceptually:

```text
Issued:
10:00 AM

Expires:
10:15 AM
```

Therefore:

```text
Token lifetime = 15 minutes
```

A common design is:

```text
Short-lived Access Token
        +
Longer-lived Refresh Token
```

This provides a balance between security and usability.

---

# 19. Why Short-Lived Access Tokens?

Suppose an attacker steals an access token.

If it is valid for:

```text
30 days
```

the attacker potentially has a long period in which to use it.

If it is valid for:

```text
15 minutes
```

the exposure window is much smaller.

Therefore:

```text
Short lifetime
      ↓
Smaller stolen-token window
```

But very short lifetimes can affect usability, so refresh-token mechanisms are commonly used.

---

# 20. Refresh Tokens

A refresh token is used to obtain a new access token without requiring the user to enter their password again.

Typical architecture:

```text
Login
  ↓
Access Token ───────→ Short lifetime
  +
Refresh Token ──────→ Longer lifetime
```

When the access token expires:

```text
Refresh Token
      ↓
Authentication Server
      ↓
New Access Token
```

Refresh tokens require careful storage, rotation, expiration, and revocation design.

---

# 21. JWT Verification

When a protected request arrives:

```text
Request
   ↓
Authorization Header
   ↓
Extract JWT
   ↓
Verify signature
   ↓
Check expiration
   ↓
Validate claims
   ↓
Authenticated request
```

The server should validate more than just the signature when appropriate.

It may verify:

* signature
* expiration
* issuer
* audience
* token type
* required claims
* allowed algorithm

---

# 22. Authorization

Authentication and authorization are different.

### Authentication

Answers:

> **Who are you?**

Example:

```text
User successfully logged in.
```

### Authorization

Answers:

> **What are you allowed to do?**

Example:

```text
User is authenticated,
but cannot delete products.
```

Flow:

```text
Authentication
      ↓
Who is the user?
      ↓
Authorization
      ↓
What can the user do?
```

---

# 23. RBAC

**RBAC = Role-Based Access Control**

Instead of assigning permissions individually to every user, permissions are grouped into roles.

Example:

```text
Roles
│
├── user
├── manager
└── admin
```

Permissions:

```text
user
 ├── View products
 └── Create orders

manager
 ├── View products
 ├── Manage orders
 └── View reports

admin
 ├── Manage users
 ├── Manage products
 ├── Manage orders
 └── Manage system settings
```

---

# 24. RBAC Middleware

Authorization middleware usually runs after authentication.

```text
Request
   ↓
Authentication Middleware
   ↓
Identify user
   ↓
Authorization Middleware
   ↓
Check role
   ↓
Controller
```

Conceptually:

```js
authenticate
authorize("admin")
controller
```

The authentication middleware establishes the identity.

The authorization middleware checks whether that identity has sufficient privileges.

---

# 25. Why Middleware Is Used for RBAC

Without middleware, authorization logic could become duplicated:

```text
Route 1 → check admin
Route 2 → check admin
Route 3 → check admin
Route 4 → check admin
```

With middleware:

```text
authorize("admin")
```

can be reused across many routes.

This provides:

* centralized authorization logic
* reusable security rules
* cleaner controllers
* easier maintenance
* consistent access control

---

# 26. 401 vs 403

These status codes are frequently confused.

### 401 Unauthorized

Usually means the request does not have valid authentication credentials.

Examples:

```text
Missing token
Invalid token
Expired token
```

### 403 Forbidden

The server understands who the caller is, but the caller does not have permission.

Example:

```text
Authenticated user
       ↓
Role = user
       ↓
DELETE /admin/users
       ↓
403 Forbidden
```

Remember:

```text
401 → Authentication problem

403 → Authorization problem
```

---

# 27. Helmet

**Helmet** is middleware for Express that helps configure security-related HTTP response headers.

Install:

```bash
npm install helmet
```

Use:

```js
app.use(helmet());
```

Helmet can help configure protections involving headers such as:

* Content-Security-Policy
* Strict-Transport-Security
* X-Content-Type-Options
* Referrer-Policy
* frame-related protections
* other browser security policies

The exact headers and defaults depend on the Helmet version and configuration.

# 28. Why Security Headers Matter

Browsers interpret HTTP response headers and use them to apply security policies.

For example:

```text
Express
   ↓
Response
   ↓
Security Headers
   ↓
Browser
   ↓
Apply security restrictions
```

Without suitable security policies, an application may have unnecessary exposure to certain browser-based attacks.

Helmet provides a standardized way to configure several of these headers.

# 29. Content Security Policy

One important security mechanism is **Content-Security-Policy (CSP)**.

CSP allows an application to specify which sources the browser is allowed to load scripts, styles, images, and other resources from.

Conceptually:

```text
Content-Security-Policy
        ↓
Allowed resources
        ↓
Browser blocks unauthorized resources
```

CSP is particularly useful for reducing the impact of certain XSS attacks.

However, CSP must be configured according to the application's actual frontend requirements.

# 30. CORS

**CORS = Cross-Origin Resource Sharing**

CORS controls which browser origins are allowed to make cross-origin requests to your API.

Suppose:

```text
Frontend
http://localhost:5173
```

calls:

```text
Backend
http://localhost:3000
```

The origins are different.

The backend can specify which origins are allowed.

# 31. Origin

An origin consists of:

```text
scheme + host + port
```

For example:

```text
https://example.com:443
```

is an origin.

These are different origins:

```text
http://example.com
https://example.com
```

and:

```text
https://example.com
https://api.example.com
```

because the scheme or host differs.

# 32. CORS Allowlist

A secure API can maintain an allowlist:

```text
Allowed Origins
│
├── https://app.example.com
└── https://admin.example.com
```

Then requests from approved browser origins are permitted according to the configured CORS policy.

Conceptually:

```text
Request
   ↓
Origin?
   ↓
┌───────────────┐
│ Allowlisted?  │
└───────┬───────┘
       / \
     Yes  No
      ↓    ↓
   Allow  Reject
```

---

# 33. CORS Is Not Authentication

This is an important distinction.

CORS does **not** protect an API from non-browser clients.

For example, an attacker can use:

* curl
* Postman
* Python
* another backend server

without being constrained by browser CORS enforcement.

Therefore:

```text
CORS
≠
Authentication
```

CORS is primarily a **browser security mechanism**.

Authentication and authorization must still protect the API.

---

# 34. Avoid Unrestricted CORS

A permissive configuration such as:

```js
cors()
```

allows broad cross-origin access according to the middleware's defaults.

For production applications, explicitly define trusted origins where appropriate.

For example:

```text
https://frontend.example.com
```

rather than allowing every origin unnecessarily.

Also be especially careful when using:

```text
credentials: true
```

because credentialed cross-origin requests require appropriate, explicit origin configuration.

---

# 35. Express Rate Limiting

`express-rate-limit` limits how frequently clients can call routes within a defined time window.

Example concept:

```text
15-minute window
        ↓
100 requests
        ↓
Further requests
        ↓
429 Too Many Requests
```

It can help defend against:

* brute-force attempts
* repeated login attempts
* automated scraping
* excessive API requests
* some denial-of-service-style application abuse

It is **not** a complete DDoS solution.

---

# 36. Rate Limit Configuration

A limiter generally has:

```text
window
+
request limit
+
response behavior
```

For example:

```text
Window:
15 minutes

Limit:
100 requests
```

Once the limit is exceeded, the application can return:

```http
429 Too Many Requests
```

---

# 37. Global vs Route-Specific Rate Limits

Not every endpoint needs the same limit.

A general API might have:

```text
100 requests / 15 minutes
```

Authentication endpoints should often be more restrictive.

For example:

```text
Login:
10 requests / 15 minutes
```

This is because login endpoints are attractive targets for password guessing.

Conceptually:

```text
/api/*
    ↓
General rate limiter

/api/auth/login
    ↓
Stricter authentication limiter
```

---

# 38. Rate Limiting and Distributed Applications

A basic in-memory rate limiter works well for simple applications and development.

However, if your API runs on multiple server instances:

```text
              Load Balancer
             /      |      \
            ↓       ↓       ↓
         Server  Server  Server
            A       B       C
```

each server may otherwise maintain its own independent rate-limit state.

For distributed deployments, use a shared store or infrastructure designed for distributed rate limiting.

---

# 39. Complete Security Layer

A secure Express API can combine all these mechanisms:

```text
                    Client
                       │
                       ▼
                ┌─────────────┐
                │    CORS     │
                │ Origin Check│
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │   Helmet    │
                │   Headers   │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │Rate Limiter │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │    JWT      │
                │Authentication│
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │    RBAC     │
                │Authorization│
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │  Controller │
                └──────┬──────┘
                       ↓
                   Database
```

---

# 40. How the Technologies Fit Together

| Technology         | Main Purpose       | Protects Against / Solves                  |
| ------------------ | ------------------ | ------------------------------------------ |
| bcrypt             | Password hashing   | Password exposure                          |
| Argon2             | Password hashing   | Password cracking                          |
| JWT                | Authentication     | Stateless identity verification            |
| JWT signing key    | Token integrity    | Token tampering                            |
| RBAC               | Authorization      | Unauthorized functionality                 |
| Helmet             | Security headers   | Browser/security-header risks              |
| CORS               | Origin control     | Unauthorized browser cross-origin requests |
| express-rate-limit | Request throttling | Brute force and automated abuse            |

---

# 41. End-to-End Authentication Architecture

A typical secure flow is:

```text
                REGISTRATION

Password
   ↓
bcrypt / Argon2
   ↓
Password Hash
   ↓
Database
```

Then:

```text
                   LOGIN

Email + Password
       ↓
Find User
       ↓
Verify Hash
       ↓
Valid?
  ┌────┴────┐
 No        Yes
 ↓           ↓
401       Issue JWT
              ↓
       Short-lived token
```

Then:

```text
              PROTECTED REQUEST

Client
  │
  │ Authorization: Bearer JWT
  ↓
CORS
  ↓
Rate Limiter
  ↓
JWT Verification
  ↓
Authentication
  ↓
RBAC
  ↓
Authorization
  ↓
Controller
  ↓
Database
```

---

# 42. Recommended Security Principles

### 1. Never store plaintext passwords

Use:

```text
Argon2id / bcrypt
```

### 2. Never put secrets in JWT payloads

JWT payloads are normally readable by whoever possesses the token.

### 3. Keep signing keys outside source code

Use:

```text
Environment variables
Secret managers
Key-management systems
```

depending on deployment requirements.

### 4. Give access tokens a finite lifetime

Avoid unnecessarily long-lived access tokens.

### 5. Validate JWT claims

Don't only check that a token "looks like a JWT."

Validate:

```text
signature
expiration
issuer
audience
algorithm
required claims
```
as appropriate.

### 6. Separate authentication and authorization
```text
Authentication → identity
Authorization → permissions
```

### 7. Use least privilege
Users should receive only the permissions they need.

### 8. Configure CORS explicitly
Allow only trusted browser origins where possible.

### 9. Apply rate limits strategically
Use stricter limits for sensitive endpoints such as login, password reset, OTP, and account recovery.

### 10. Use HTTPS
Passwords, JWTs, and other credentials should not travel over unencrypted HTTP in production.

# MODULE6
## Express.js — Testing, Redis Caching, PM2 & Production Deployment

## 1. Automated Endpoint Assertion Testing in Express.js

### 1.1 Theory

In an Express.js application, APIs are exposed through endpoints such as `GET`, `POST`, `PUT`, and `DELETE`. As the application grows, manually testing every endpoint using tools such as Postman becomes time-consuming.
**Automated endpoint assertion testing** solves this problem by allowing a testing framework to send requests to Express.js endpoints and automatically verify whether the responses are correct.

A test can verify:

* HTTP status codes
* Response body
* Response headers
* Validation errors
* Authentication behavior
* Error responses
* CRUD operations
* Middleware behavior

A common combination is:

**Jest/Node.js Test Runner + Supertest + Express.js**

### 1.2 Definition

**Endpoint assertion testing** is the process of automatically sending HTTP requests to an Express.js endpoint and comparing the actual response with the expected result.

For example, if:

```text
GET /api/users
```

is expected to return:

```text
HTTP 200
```

the automated test verifies that the endpoint actually returns `200`.

The test can also verify that the response contains the expected user information.

### 1.3 Why it is used

Automated endpoint testing is used because it:

* Reduces manual API testing
* Detects bugs early
* Prevents regression
* Verifies API contracts
* Tests success and failure scenarios
* Makes testing repeatable
* Can run automatically during CI/CD

### 1.4 How it works

The testing process is:

```text
Test File
    ↓
Supertest
    ↓
HTTP Request
    ↓
Express Application
    ↓
Middleware
    ↓
Route
    ↓
Controller / Business Logic
    ↓
Response
    ↓
Supertest receives response
    ↓
Jest performs assertions
```

An **assertion** is simply a statement that verifies whether the actual result matches the expected result.

For example:

```text
Expected status → 200
Actual status   → 200

Result → PASS
```

### 1.5 Architecture / Flow

```text
                    Express.js Application
                           │
                           ▼
                    ┌─────────────┐
                    │   Router    │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Middleware  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Controller  │
                    └──────┬──────┘
                           │
                           ▼
                       Response
                           │
                           ▼
                     Supertest
                           │
                           ▼
                     Assertions
                           │
                     ┌─────┴─────┐
                     ▼           ▼
                   PASS         FAIL
```

### 1.6 Important Concepts

#### Supertest

Supertest is used to make HTTP requests against an Express application during testing.

It allows a test to simulate requests such as:

```text
GET /api/users
POST /api/users
PUT /api/users/1
DELETE /api/users/1
```

without manually starting the application and using Postman.

#### Jest

Jest is a JavaScript testing framework.

It provides:

* Test cases
* Assertions
* Test suites
* Setup and cleanup
* Test result reporting

#### Node.js Native Test Runner

Modern Node.js also provides its own built-in test runner through the `node:test` module.

This means Express applications can be tested without necessarily using Jest.

#### Status-code assertion

Verifies whether the API returned the expected HTTP status.

Common examples:

```text
200 → Successful request
201 → Resource created
400 → Bad request
401 → Unauthorized
403 → Forbidden
404 → Resource not found
500 → Server error
```

#### Response-body assertion

Checks whether the returned JSON contains the expected data.

#### Negative testing

Testing is not limited to successful requests.

For example:

```text
Valid email     → 201
Invalid email   → 400
Missing user    → 404
Unauthorized    → 401
```

---

# 2. POC — Automated Endpoint Testing

## 2.1 Folder Structure

```text
express-testing-poc/
│
├── src/
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── user.test.js
│
├── package.json
└── package-lock.json
```

## 2.2 Install Packages

```bash
npm init -y
npm install express
npm install --save-dev jest supertest
```

Update `package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "test": "jest"
  }
}
```

## 2.3 `src/app.js`

```javascript
const express = require("express");

const app = express();

app.use(express.json());

const users = [
    {
        id: 1,
        name: "Vaishu",
        email: "vaishu@example.com"
    }
];

app.get("/api/users", (req, res) => {
    res.status(200).json({
        success: true,
        users
    });
});

app.get("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        user
    });
});

module.exports = app;
```

## 2.4 `src/server.js`

```javascript
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## 2.5 `tests/user.test.js`

```javascript
const request = require("supertest");
const app = require("../src/app");

describe("User API", () => {

    test("GET /api/users should return users", async () => {

        const response = await request(app)
            .get("/api/users");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.users).toHaveLength(1);

        expect(response.body.users[0].name)
            .toBe("Vaishu");
    });

    test("GET /api/users/1 should return a user", async () => {

        const response = await request(app)
            .get("/api/users/1");

        expect(response.statusCode).toBe(200);

        expect(response.body.user.id).toBe(1);
    });

    test("GET /api/users/999 should return 404", async () => {

        const response = await request(app)
            .get("/api/users/999");

        expect(response.statusCode).toBe(404);

        expect(response.body.success).toBe(false);

        expect(response.body.message)
            .toBe("User not found");
    });

});
```

## 2.6 Run Commands

Run the tests:

```bash
npm test
```

Run the Express application:

```bash
npm start
```

## 2.7 Expected Output

```text
PASS  tests/user.test.js

User API
  ✓ GET /api/users should return users
  ✓ GET /api/users/1 should return a user
  ✓ GET /api/users/999 should return 404

Test Suites: 1 passed
Tests:       3 passed
```

---

# 3. Redis Caching for Performance Scaling in Express.js

## 3.1 Theory

An Express.js API commonly communicates with a database.

Consider an endpoint:

```text
GET /api/products
```

If thousands of users repeatedly request the same products, every request may execute the same database query.

This creates unnecessary:

* Database CPU usage
* Database connections
* Network traffic
* Query processing
* API response time

**Redis caching** can store frequently requested data in memory.

Instead of querying the database every time, Express can first check Redis.

### 3.2 Definition

**Redis caching** is the process of storing frequently accessed application data in Redis so that future requests can retrieve that data faster instead of repeatedly querying the database.

Redis is an **in-memory data store**, meaning frequently accessed data can be retrieved much faster than repeatedly performing database queries.

### 3.3 Why it is used

Redis is commonly used to:

* Reduce database load
* Improve API response time
* Handle high request volumes
* Store temporary data
* Cache expensive queries
* Store sessions
* Implement rate limiting
* Store frequently accessed API responses

### 3.4 How it works

A common pattern is called **Cache-Aside**.

```text
Client
  ↓
Express API
  ↓
Check Redis
  │
  ├── Cache HIT
  │      ↓
  │   Return data
  │
  └── Cache MISS
         ↓
      Database
         ↓
      Store in Redis
         ↓
      Return data
```

### 3.5 Architecture / Flow

```text
             Client
                │
                ▼
         Express.js API
                │
                ▼
            Redis
          /       \
       HIT         MISS
        │            │
        │            ▼
        │        Database
        │            │
        │            ▼
        │         Redis
        │            │
        └──────┬─────┘
               ▼
            Response
```

### 3.6 Important Concepts

#### Cache Hit

The requested data already exists in Redis.

```text
Request
   ↓
Redis
   ↓
Data found
   ↓
Return immediately
```

#### Cache Miss

The requested data does not exist in Redis.

```text
Request
   ↓
Redis
   ↓
Data not found
   ↓
Database
   ↓
Store in Redis
   ↓
Return response
```

#### TTL

**TTL — Time To Live** determines how long cached data should remain available.

For example:

```text
Product cache
TTL = 60 seconds
```

After 60 seconds, Redis automatically expires the cached value.

#### Cache Invalidation

When database data changes, the corresponding cached value may become outdated.

For example:

```text
Database:
Product price = ₹100

Redis:
Product price = ₹100
```

If the database changes:

```text
Database:
Product price = ₹120
```

but Redis still contains:

```text
₹100
```

the API could return stale data.

Therefore, applications need a cache invalidation strategy.

---

# 4. POC — Redis Caching with Express.js

## 4.1 Folder Structure

```text
express-redis-poc/
│
├── src/
│   ├── app.js
│   ├── server.js
│   └── redis.js
│
├── package.json
└── package-lock.json
```

## 4.2 Install Packages

```bash
npm init -y
npm install express redis
```

Redis must also be running locally or be available through a Redis server.

## 4.3 `src/redis.js`

```javascript
const { createClient } = require("redis");

const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on("error", (error) => {
    console.error("Redis Error:", error);
});

async function connectRedis() {
    await redisClient.connect();
    console.log("Redis connected");
}

module.exports = {
    redisClient,
    connectRedis
};
```

## 4.4 `src/app.js`

```javascript
const express = require("express");
const { redisClient } = require("./redis");

const app = express();

app.use(express.json());

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 75000
    },
    {
        id: 2,
        name: "Mobile",
        price: 30000
    }
];

app.get("/api/products", async (req, res) => {

    try {

        const cachedProducts =
            await redisClient.get("products");

        if (cachedProducts) {

            console.log("CACHE HIT");

            return res.status(200).json({
                source: "redis",
                products: JSON.parse(cachedProducts)
            });
        }

        console.log("CACHE MISS");

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        await redisClient.setEx(
            "products",
            60,
            JSON.stringify(products)
        );

        res.status(200).json({
            source: "database",
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = app;
```

## 4.5 `src/server.js`

```javascript
const app = require("./app");
const { connectRedis } = require("./redis");

const PORT = 3000;

async function startServer() {

    await connectRedis();

    app.listen(PORT, () => {
        console.log(
            `Server running on http://localhost:${PORT}`
        );
    });
}

startServer();
```

## 4.6 Run Commands

Start Redis.

Then:

```bash
node src/server.js
```

Open:

```text
GET http://localhost:3000/api/products
```

### First request

```text
CACHE MISS
```

Response:

```json
{
    "source": "database",
    "products": [
        {
            "id": 1,
            "name": "Laptop",
            "price": 75000
        },
        {
            "id": 2,
            "name": "Mobile",
            "price": 30000
        }
    ]
}
```

### Second request

```text
CACHE HIT
```

Response:

```json
{
    "source": "redis",
    "products": [
        {
            "id": 1,
            "name": "Laptop",
            "price": 75000
        },
        {
            "id": 2,
            "name": "Mobile",
            "price": 30000
        }
    ]
}
```

The first request represents a **cache miss**, while subsequent requests within the TTL can be served directly from Redis.

---

# 5. PM2 Process Management in Express.js

## 5.1 Theory

Node.js applications use an event-driven architecture and normally execute JavaScript on a single main thread.

A server running as a single Node.js process cannot fully utilize all CPU cores for JavaScript execution.

For production applications, multiple Express.js processes can be created so that incoming requests can be distributed across available CPU cores.

**PM2** is a production process manager commonly used for Node.js applications.

### 5.2 Definition

PM2 is a process manager for Node.js applications that can:

* Start applications
* Restart crashed processes
* Run multiple application instances
* Manage application logs
* Support cluster mode
* Perform graceful reloads
* Keep applications running in production

### 5.3 Why it is used

Without process management:

```text
Express Process
     ↓
Application crashes
     ↓
Server unavailable
```

With PM2:

```text
Express Process
     ↓
Application crashes
     ↓
PM2 detects failure
     ↓
Process restarted
```

### 5.4 How clustering works

Suppose the machine has:

```text
CPU Core 1
CPU Core 2
CPU Core 3
CPU Core 4
```

PM2 can create multiple Express instances.

```text
                PM2
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
   Express 1  Express 2  Express 3
       │         │         │
       └─────────┼─────────┘
                 ▼
              Requests
```

PM2 distributes incoming connections between processes.

### 5.5 Architecture / Flow

```text
                    Client
                       │
                       ▼
                PM2 Load Balancer
                 │      │      │
                 ▼      ▼      ▼
              Node 1  Node 2  Node 3
                 │      │      │
                 └──────┼──────┘
                        ▼
                    Database
```

### 5.6 Important Concepts

#### Fork Mode

Runs a normal Node.js process.

#### Cluster Mode

Creates multiple Node.js instances that can share the same server port and distribute incoming requests.

#### Load Balancing

Requests are distributed between available application processes.

#### Process Recovery

PM2 can automatically restart a process when it crashes.

#### Stateless Application

Clustered applications should generally avoid storing important request state inside a single process's memory.

For example, this is problematic:

```text
User login
   ↓
Process 1 memory
```

A later request could reach:

```text
Process 2
```

and Process 2 would not have Process 1's memory.

Shared systems such as Redis or a database should therefore be used for shared state.

---

# 6. POC — PM2 with Express.js

## 6.1 Folder Structure

```text
express-pm2-poc/
│
├── src/
│   └── server.js
│
├── ecosystem.config.js
└── package.json
```

## 6.2 Install

```bash
npm init -y
npm install express
npm install pm2 --save-dev
```

## 6.3 `src/server.js`

```javascript
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {

    res.json({
        message: "Express application running",
        processId: process.pid
    });

});

app.get("/api/users", (req, res) => {

    res.json({
        users: [
            {
                id: 1,
                name: "Vaishu"
            }
        ],
        processId: process.pid
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

    console.log(
        `Process ID: ${process.pid}`
    );

});
```

## 6.4 `ecosystem.config.js`

```javascript
module.exports = {
    apps: [
        {
            name: "express-api",
            script: "./src/server.js",
            instances: "max",
            exec_mode: "cluster",
            autorestart: true,
            watch: false
        }
    ]
};
```

### Explanation

```text
instances: "max"
```

tells PM2 to create instances based on the available CPU cores.

```text
exec_mode: "cluster"
```

enables PM2 cluster mode.

```text
autorestart: true
```

allows PM2 to restart the application if a process terminates unexpectedly.

## 6.5 Run Commands

Start the application:

```bash
npx pm2 start ecosystem.config.js
```

Check processes:

```bash
npx pm2 list
```

View logs:

```bash
npx pm2 logs
```

Check application:

```text
http://localhost:3000
```

Stop:

```bash
npx pm2 stop express-api
```

Delete:

```bash
npx pm2 delete express-api
```

## 6.6 Expected Output

PM2 will show multiple application instances:

```text
┌────┬──────────────┬────────┬─────────┐
│ id │ name         │ mode   │ status  │
├────┼──────────────┼────────┼─────────┤
│ 0  │ express-api  │ cluster│ online  │
│ 1  │ express-api  │ cluster│ online  │
│ 2  │ express-api  │ cluster│ online  │
│ 3  │ express-api  │ cluster│ online  │
└────┴──────────────┴────────┴─────────┘
```

Requests may be handled by different processes:

```json
{
    "message": "Express application running",
    "processId": 12340
}
```

Another request:

```json
{
    "message": "Express application running",
    "processId": 15220
}
```

This demonstrates that multiple Express processes are participating in handling requests.

---

# 7. Production Deployment of Express.js

## 7.1 Theory

Development and production environments have different requirements.

During development, an application may use:

```text
Development configuration
Detailed errors
Console debugging
Local database
Development dependencies
```

Production requires:

```text
Secure configuration
Production database
Error handling
Structured logging
Process management
Monitoring
Performance optimization
```

### 7.2 Definition

**Production deployment** is the process of making an Express.js application available to real users in a production environment.

The application is typically deployed to a cloud server or cloud platform.

### 7.3 Why it is used

Production configuration helps:

* Improve reliability
* Protect sensitive configuration
* Improve performance
* Manage application failures
* Monitor application behavior
* Handle real user traffic
* Automate deployments

---

# 8. NODE_ENV

`NODE_ENV` identifies the environment in which the Express application is running.

Common values are:

```text
development
test
production
```

For example:

```text
NODE_ENV=development
```

means the application is running in development.

```text
NODE_ENV=production
```

indicates a production environment.

Express and other Node.js libraries can use this information to change behavior appropriately.

### Production flow

```text
NODE_ENV=production
        ↓
Production configuration
        ↓
Production logging
        ↓
Optimized behavior
        ↓
Production server
```

---

# 9. Production Logging

Logging is the process of recording important application events.

Production applications should not depend only on:

```javascript
console.log()
```

for serious monitoring.

Production logging should capture information such as:

```text
Request received
Response status
Response time
Application errors
Database errors
Authentication failures
System events
```

A production logging system should generally provide:

* Log levels
* Timestamps
* Structured information
* Error details
* Request identifiers
* Centralized storage

Common log levels include:

```text
DEBUG
INFO
WARN
ERROR
```

---

# 10. Production Deployment Architecture

A typical Express production architecture can look like:

```text
                    Internet
                       │
                       ▼
                Reverse Proxy
                 / Load Balancer
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Express 1    Express 2    Express 3
          │            │            │
          └────────────┼────────────┘
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
          Redis              Database
```

A CI/CD pipeline sits alongside this architecture:

```text
Developer
    │
    ▼
Git Repository
    │
    ▼
CI Pipeline
    │
    ├── Install dependencies
    ├── Run tests
    ├── Validate application
    │
    ▼
Build / Deployment
    │
    ▼
Cloud Server
    │
    ▼
PM2
    │
    ▼
Express.js
```

---

# 11. Production Deployment Pipeline

## 11.1 Continuous Integration

**Continuous Integration (CI)** automatically validates code whenever changes are pushed to the repository.

Typical process:

```text
Git Push
   ↓
Install Dependencies
   ↓
Run Tests
   ↓
Validate Code
   ↓
Build
```

If testing fails:

```text
CI Pipeline
     ↓
Tests Failed
     ↓
Deployment Stopped
```

If testing succeeds:

```text
Tests Passed
     ↓
Continue Deployment
```

## 11.2 Continuous Deployment

**Continuous Deployment (CD)** automatically deploys validated application changes to the target environment.

```text
Developer
   ↓
Git Push
   ↓
CI
   ↓
Tests
   ↓
Build
   ↓
Deployment
   ↓
Production
```

---

# 12. POC — Express Production Configuration

## 12.1 Folder Structure

```text
express-production-poc/
│
├── src/
│   ├── app.js
│   └── server.js
│
├── logs/
│
├── .env
├── package.json
└── ecosystem.config.js
```

## 12.2 Install Packages

```bash
npm init -y
npm install express dotenv
npm install pm2
```

## 12.3 `.env`

```env
NODE_ENV=production
PORT=3000
APP_NAME=ExpressProductionAPI
```

Environment variables should be used for configuration rather than hard-coding environment-specific values inside application logic.

## 12.4 `src/app.js`

```javascript
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        application: process.env.APP_NAME,
        environment: process.env.NODE_ENV,
        message: "Production Express API is running"
    });

});

app.get("/api/health", (req, res) => {

    res.status(200).json({
        status: "healthy",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });

});

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});

module.exports = app;
```

## 12.5 `src/server.js`

```javascript
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {

    console.log(
        `${process.env.APP_NAME} running in ${process.env.NODE_ENV} mode`
    );

    console.log(
        `Server running on port ${PORT}`
    );

});

process.on("SIGTERM", () => {

    console.log("SIGTERM received");

    server.close(() => {

        console.log("Server closed gracefully");

        process.exit(0);

    });

});
```

### Why graceful shutdown is important

When a production process needs to stop, it should not immediately terminate active requests.

Instead:

```text
Shutdown signal
      ↓
Stop accepting new requests
      ↓
Finish existing requests
      ↓
Close database connections
      ↓
Close other resources
      ↓
Process exits
```

This is called **graceful shutdown**.

## 12.6 `ecosystem.config.js`

```javascript
module.exports = {

    apps: [

        {
            name: "express-production-api",

            script: "./src/server.js",

            instances: "max",

            exec_mode: "cluster",

            env_production: {
                NODE_ENV: "production"
            },

            autorestart: true,

            watch: false,

            time: true
        }

    ]

};
```

## 12.7 Run Commands

Start normally:

```bash
node src/server.js
```

Or start using PM2:

```bash
npx pm2 start ecosystem.config.js --env production
```

Check processes:

```bash
npx pm2 list
```

View logs:

```bash
npx pm2 logs
```

Check the API:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/api/health
```

## 12.8 Expected Output

```json
{
    "success": true,
    "application": "ExpressProductionAPI",
    "environment": "production",
    "message": "Production Express API is running"
}
```

Health endpoint:

```json
{
    "status": "healthy",
    "environment": "production",
    "timestamp": "2026-10-05T..."
}
```

PM2:

```text
express-production-api
status: online
mode: cluster
instances: multiple
```

---

# 13. How All Four Concepts Work Together

These technologies solve different production problems but can be combined in one Express.js application.

```text
                         CLIENT
                           │
                           ▼
                    Load Balancer
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
        Express #1    Express #2    Express #3
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                         Redis
                           │
                    Cache HIT / MISS
                           │
                           ▼
                       Database
```

Testing happens before deployment:

```text
Developer
    ↓
Express Code
    ↓
Supertest + Jest
    ↓
Endpoint Assertions
    ↓
Tests Pass
    ↓
CI/CD
    ↓
Production
    ↓
PM2 Cluster
    ↓
Express Instances
    ↓
Redis
    ↓
Database
```

### Overall responsibility

| Technology             | Main responsibility                  |
| ---------------------- | ------------------------------------ |
| **Supertest**          | Sends requests to Express endpoints  |
| **Jest**               | Runs tests and assertions            |
| **Redis**              | Caches frequently accessed data      |
| **PM2**                | Manages and scales Node.js processes |
| **NODE_ENV**           | Identifies application environment   |
| **Production logging** | Records application events           |
| **CI/CD**              | Automates testing and deployment     |
| **Cloud platform**     | Hosts the production application     |

