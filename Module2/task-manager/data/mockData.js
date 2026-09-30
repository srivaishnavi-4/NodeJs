const tasks = [
    {
        id: 1,
        title: "Learn Express",
        description: "Learn Express routing and middleware",
        status: "pending"
    },
    {
        id: 2,
        title: "Build REST API",
        description: "Create a REST API using Express",
        status: "in-progress"
    },
    {
        id: 3,
        title: "Practice JavaScript",
        description: "Practice asynchronous JavaScript",
        status: "completed"
    },
    {
        id: 4,
        title: "Learn Node.js",
        description: "Understand Node.js modules",
        status: "pending"
    },
    {
        id: 5,
        title: "Create Mini Project",
        description: "Build a small backend project",
        status: "pending"
    },
    {
        id: 6,
        title: "Test API",
        description: "Test all API endpoints",
        status: "in-progress"
    }
];

const comments = [
    {
        id: 1,
        taskId: 1,
        text: "Express routing is easy to understand."
    },
    {
        id: 2,
        taskId: 1,
        text: "Need to practice middleware."
    },
    {
        id: 3,
        taskId: 2,
        text: "REST APIs should use meaningful status codes."
    }
];

module.exports = {
    tasks,
    comments
};