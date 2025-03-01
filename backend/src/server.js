require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Import routes
const weatherRoutes = require('./routes/weatherRoutes');
const mlRoutes = require('./routes/mlRoutes');

const app = express();

// Basic middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend requests
    credentials: true
}));
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to NullVoid Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            weather: '/api/weather',
            ml: '/api/ml/*'
        }
    });
});

// Serve TensorFlow.js model files
app.use('/ml_service/tfjs_model', express.static(path.join(__dirname, '../ml_service/tfjs_model')));

// API routes
app.use('/api', weatherRoutes);
app.use('/api/ml', mlRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
            weather: 'up',
            ml: 'up'
        }
    });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Something went wrong!',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`- Health check: http://localhost:${PORT}/health`);
    console.log(`- Weather API: http://localhost:${PORT}/api/weather`);
    console.log(`- ML API: http://localhost:${PORT}/api/ml`);
}); 