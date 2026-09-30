const { tasks } = require("../data/mockData");

// GET /api/v1/tasks
const getTasks = (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    if (page < 1 || limit < 1) {
        return res.status(400).json({
            message: "Page and limit must be greater than 0"
        });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedTasks = tasks.slice(startIndex, endIndex);

    res.status(200).json({
        page,
        limit,
        totalTasks: tasks.length,
        totalPages: Math.ceil(tasks.length / limit),
        data: paginatedTasks
    });
};


// GET /api/v1/tasks/:id
const getTaskById = (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
};


// POST /api/v1/tasks
const createTask = (req, res) => {

    const { title, description, status } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status: status || "pending"
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        data: newTask
    });
};


// PUT /api/v1/tasks/:id
const updateTask = (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, description, status } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    res.status(200).json({
        message: "Task updated successfully",
        data: task
    });
};


// DELETE /api/v1/tasks/:id
const deleteTask = (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();
};


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};