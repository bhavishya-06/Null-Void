const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Validation failed',
                details: errors.array(),
                code: 400
            }
        });
    }
    next();
};

// Validation rules for weather data
const weatherValidationRules = [
    body('temperature').isFloat().withMessage('Temperature must be a number'),
    body('humidity').isFloat().withMessage('Humidity must be a number'),
    body('windSpeed').isFloat().withMessage('Wind speed must be a number'),
    body('solarIrradiance').isFloat().withMessage('Solar irradiance must be a number')
];

module.exports = {
    validate,
    weatherValidationRules
}; 