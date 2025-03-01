const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mlController = require('../controllers/mlController');

// Load ML model
router.post('/load', mlController.loadModel);

// Get model status
router.get('/status', mlController.getModelStatus);

// Make prediction
router.post('/predict',
    [
        body('temperature').isFloat(),
        body('humidity').isFloat(),
        body('windSpeed').isFloat(),
        body('solarIrradiance').isFloat()
    ],
    mlController.predict
);

// Get model information
router.get('/info', mlController.getModelInfo);

// Get model metrics
router.get('/metrics', mlController.getModelMetrics);

module.exports = router; 