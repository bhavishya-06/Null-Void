const express = require('express');
const router = express.Router();
const MLService = require('../services/mlService');

// Get weather data for a location
router.get('/weather', async (req, res, next) => {
    const { location } = req.query;
    
    if (!location) {
        return res.status(400).json({
            success: false,
            error: 'Location is required',
            examples: [
                'New Delhi',
                'New York',
                'London',
                'Tokyo'
            ]
        });
    }

    try {
        const result = await MLService.getWeatherData(location);
        res.json({
            success: true,
            location: result.location,
            timestamp: new Date().toISOString(),
            data: result.weatherData
        });
    } catch (error) {
        next(error);
    }
});

// Get supported locations (example endpoint)
router.get('/locations', (req, res) => {
    res.json({
        success: true,
        message: 'You can use any city name',
        examples: [
            'New Delhi',
            'New York',
            'London',
            'Tokyo',
            'Mumbai',
            'Paris',
            'Berlin'
        ]
    });
});

module.exports = router; 