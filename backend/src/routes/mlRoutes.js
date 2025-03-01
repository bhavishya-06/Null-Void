const express = require('express');
const router = express.Router();
const MLService = require('../services/mlService');
const mlService = new MLService();

// Get ML model status and info
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'ML Service API',
        endpoints: {
            modelInfo: '/model-info',
            predict: '/predict',
            status: '/status'
        }
    });
});

// Get model information
router.get('/model-info', (req, res) => {
    res.json({
        success: true,
        data: mlService.getModelInfo()
    });
});

// Get model status
router.get('/status', async (req, res) => {
    try {
        const status = await mlService.getStatus();
        res.json({
            success: true,
            data: status
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Make prediction
router.get('/predict', async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ success: false, error: 'Location is required' });
    }

    try {
        const predictions = await mlService.predict(location);
        res.json({ 
            success: true, 
            predictions: predictions.map(p => ({
                time: p.time,
                solar: p.solar_output,
                wind: p.wind_output
            }))
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
});

// Get model metrics
router.get('/metrics', async (req, res) => {
    try {
        const metrics = await mlService.getModelMetrics();
        res.json({
            success: true,
            data: metrics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router; 