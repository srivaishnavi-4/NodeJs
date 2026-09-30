const express = require("express");

const app = express();

const PORT = 8080;

const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");


// Middleware
app.use(express.json());


// Task routes
app.use("/api/v1/tasks", taskRoutes);


// Nested comment routes
app.use(
    "/api/v1/tasks/:id/comments",
    commentRoutes
);


// Root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});