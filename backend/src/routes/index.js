const express = require('express');
const router = express.Router();

const weatherRoutes = require('./weatherRoutes');
const forecastRoutes = require('./forecastRoutes');
const modelRoutes = require('./modelRoutes');

// Weather data endpoints
router.use('/weather', weatherRoutes);

// Forecast endpoints
router.use('/forecast', forecastRoutes);

// ML model endpoints
router.use('/models', modelRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'nullvoid-backend',
        version: process.env.npm_package_version
    });
});

module.exports = router; 