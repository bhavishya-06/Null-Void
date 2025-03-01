const { validationResult } = require('express-validator');
const MLService = require('../services/mlService');

const mlController = {
    async loadModel(req, res) {
        try {
            const result = await MLService.loadModel();
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    async getModelStatus(req, res) {
        try {
            const status = await MLService.getStatus();
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
    },

    async predict(req, res) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: validationErrors.array()
                });
            }

            const prediction = await MLService.predict(req.body);
            res.json({
                success: true,
                data: prediction
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    async getModelInfo(req, res) {
        try {
            const info = await MLService.getModelInfo();
            res.json({
                success: true,
                data: info
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    async getModelMetrics(req, res) {
        try {
            const metrics = await MLService.getModelMetrics();
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
    }
};

module.exports = mlController; 