const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    // Default error
    const error = {
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            code: err.status || 500,
            timestamp: new Date().toISOString()
        }
    };

    // Handle specific error types
    if (err.name === 'ValidationError') {
        error.error.code = 400;
        error.error.type = 'ValidationError';
    }

    if (err.name === 'UnauthorizedError') {
        error.error.code = 401;
        error.error.type = 'UnauthorizedError';
    }

    res.status(error.error.code).json(error);
};

module.exports = errorMiddleware; 