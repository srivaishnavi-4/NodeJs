const { tasks, comments } = require("../data/mockData");


// GET /api/v1/tasks/:id/comments
const getComments = (req, res) => {

    const taskId = Number(req.params.id);

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const taskComments = comments.filter(
        comment => comment.taskId === taskId
    );

    res.status(200).json({
        taskId,
        totalComments: taskComments.length,
        data: taskComments
    });
};


// POST /api/v1/tasks/:id/comments
const addComment = (req, res) => {

    const taskId = Number(req.params.id);

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            message: "Comment text is required"
        });
    }

    const newComment = {
        id: comments.length + 1,
        taskId,
        text
    };

    comments.push(newComment);

    res.status(201).json({
        message: "Comment added successfully",
        data: newComment
    });
};


// DELETE /api/v1/tasks/:id/comments/:commentId
const deleteComment = (req, res) => {

    const taskId = Number(req.params.id);
    const commentId = Number(req.params.commentId);

    const commentIndex = comments.findIndex(
        comment =>
            comment.id === commentId &&
            comment.taskId === taskId
    );

    if (commentIndex === -1) {
        return res.status(404).json({
            message: "Comment not found"
        });
    }

    comments.splice(commentIndex, 1);

    res.status(204).send();
};


module.exports = {
    getComments,
    addComment,
    deleteComment
};