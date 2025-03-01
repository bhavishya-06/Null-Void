const winston = require('winston');

// Create logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Add console logging in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const requestLogger = (req, res, next) => {
    // Log request
    logger.info({
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });

    // Log response
    const originalSend = res.send;
    res.send = function(data) {
        logger.info({
            response: {
                statusCode: res.statusCode,
                body: data,
                timestamp: new Date().toISOString()
            }
        });
        originalSend.apply(res, arguments);
    };

    next();
};

module.exports = { requestLogger, logger }; 