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
