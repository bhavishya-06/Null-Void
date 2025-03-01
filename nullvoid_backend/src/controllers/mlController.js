const { validationResult } = require('express-validator');
const MLService = require('../services/mlService');

// Load ML model
exports.loadModel = async (req, res) => {
    try {
        const result = await MLService.loadModel();
        res.json({
            success: true,
            message: 'Model loaded successfully',
            modelInfo: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to load model',
                details: error.message
            }
        });
    }
};

// Get model status
exports.getModelStatus = async (req, res) => {
    try {
        const status = await MLService.getStatus();
        res.json({
            success: true,
            status: status
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to get model status',
                details: error.message
            }
        });
    }
};

// Make prediction
exports.predict = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Invalid input data',
                details: errors.array()
            }
        });
    }

    try {
        const prediction = await MLService.predict(req.body);
        res.json({
            success: true,
            prediction: prediction,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: 'Prediction failed',
                details: error.message
            }
        });
    }
};

// Get model information
exports.getModelInfo = async (req, res) => {
    try {
        const info = await MLService.getModelInfo();
        res.json({
            success: true,
            modelInfo: info
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to get model information',
                details: error.message
            }
        });
    }
};

// Get model metrics
exports.getModelMetrics = async (req, res) => {
    try {
        const metrics = await MLService.getModelMetrics();
        res.json({
            success: true,
            metrics: metrics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to get model metrics',
                details: error.message
            }
        });
    }
}; 