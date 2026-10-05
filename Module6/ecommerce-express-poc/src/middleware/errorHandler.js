function notFoundHandler(req, res) {

    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });

}

function errorHandler(error, req, res, next) {

    console.error(
        "Application Error:",
        error
    );

    const statusCode =
        error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : error.message
    });

}

module.exports = {
    notFoundHandler,
    errorHandler
};