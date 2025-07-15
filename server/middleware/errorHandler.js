const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);

    const titles = {
        400: "Validation Error",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        409: "Conflict",
        500: "Internal Server Error",
    };

    res.json({
        success: false,
        data: {
            title: titles[statusCode] || "Error",
            message: err.message,
            stackTrace: err.stack,
        },
    });
};

module.exports = errorHandler;