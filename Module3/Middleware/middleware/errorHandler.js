function notFound(req, res, next) {

    const error = new Error(
        `Route ${req.method} ${req.originalUrl} not found`
    );

    error.statusCode = 404;

    next(error);
}


function errorHandler(err, req, res, next) {

    console.error(err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        error: statusCode === 500
            ? "Internal Server Error"
            : err.message
    });
}


module.exports = {
    notFound,
    errorHandler
};