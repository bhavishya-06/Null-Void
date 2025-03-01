require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware');
const { requestLogger, logger } = require('./middleware/requestLogger');
const authMiddleware = require('./middleware/authMiddleware');

// Import routes
const routes = require('./routes');

const app = express();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

// Basic middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable CORS
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom middleware
app.use(requestLogger); // Request logging

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Protected routes
app.use('/api/v1', authMiddleware, routes);

// Health check endpoint (unprotected)
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Error handling middleware (should be last)
app.use(errorMiddleware);

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    // In production, you might want to exit and let your process manager restart the app
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
}); 