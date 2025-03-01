const { spawn } = require('child_process');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

class MLService {
    constructor() {
        this.modelStatus = 'ready';
        this.modelInfo = {
            name: 'weather_prediction_model',
            version: '1.0.0',
            type: 'scikit-learn',
            inputFeatures: ['temperature', 'humidity', 'windSpeed', 'solarIrradiance'],
            outputFeatures: ['solar_power', 'wind_power']
        };
    }

    static formatLocation(location) {
        // Remove any extra quotes
        location = location.replace(/['"]+/g, '');
        
        // Split by comma and take the city part
        const cityPart = location.split(',')[0];
        
        // Replace multiple spaces with single space and trim
        return cityPart.replace(/\s+/g, ' ').trim();
    }

    async predict(location) {
        try {
            // Run Python script for prediction
            const pythonProcess = spawn('python', [
                path.join(__dirname, '../../../ml_service/model.py'),
                '--location', location,
                '--mode', 'predict'
            ]);

            return new Promise((resolve, reject) => {
                let result = '';
                let error = '';

                pythonProcess.stdout.on('data', (data) => {
                    result += data.toString();
                });

                pythonProcess.stderr.on('data', (data) => {
                    error += data.toString();
                });

                pythonProcess.on('close', (code) => {
                    if (code !== 0) {
                        console.error('Python script error:', error);
                        reject(new Error('Error running prediction model'));
                        return;
                    }

                    try {
                        const predictions = JSON.parse(result);
                        resolve(predictions);
                    } catch (e) {
                        console.error('Error parsing prediction results:', e);
                        reject(new Error('Error parsing prediction results'));
                    }
                });
            });
        } catch (error) {
            console.error('Prediction error:', error);
            throw new Error('Failed to make prediction: ' + error.message);
        }
    }

    static async getWeatherData(location) {
        try {
            // Format the location name
            const formattedLocation = MLService.formatLocation(location);
            console.log(`Fetching weather data for location: ${formattedLocation}`);

            // First, get the coordinates for the location using the Geocoding API
            const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(formattedLocation)}&count=1&language=en&format=json`;
            console.log(`Geocoding URL: ${geocodingUrl}`);
            
            const geocodingResponse = await axios.get(geocodingUrl);

            if (!geocodingResponse.data.results || geocodingResponse.data.results.length === 0) {
                throw new Error(`Location "${formattedLocation}" not found. Please check the city name.`);
            }

            const { latitude, longitude, name, country } = geocodingResponse.data.results[0];
            console.log(`Found location: ${name}, ${country} at coordinates: ${latitude}, ${longitude}`);

            // Get weather forecast using the coordinates
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,cloudcover,direct_radiation&timezone=auto`;
            const weatherResponse = await axios.get(weatherUrl);

            if (!weatherResponse.data || !weatherResponse.data.hourly) {
                throw new Error('Invalid response format from Open-Meteo API');
            }

            // Get current hour's data
            const hourly = weatherResponse.data.hourly;
            const currentHour = new Date().getHours();
            const currentIndex = currentHour;

            const weatherData = {
                temperature: hourly.temperature_2m[currentIndex],
                windSpeed: hourly.windspeed_10m[currentIndex],
                humidity: hourly.relativehumidity_2m[currentIndex],
                cloudCover: hourly.cloudcover[currentIndex],
                solarIrradiance: hourly.direct_radiation[currentIndex] || 0
            };

            return {
                ...weatherData,
                location: {
                    name,
                    country,
                    latitude,
                    longitude
                }
            };

        } catch (error) {
            console.error('Weather API Error:', error.message);
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }

    async getStatus() {
        return {
            status: this.modelStatus,
            lastUpdated: new Date().toISOString()
        };
    }

    async getModelInfo() {
        return {
            ...this.modelInfo,
            status: this.modelStatus
        };
    }

    async getModelMetrics() {
        return {
            accuracy: 0.95,
            precision: 0.94,
            recall: 0.93,
            f1Score: 0.94,
            lastUpdated: new Date().toISOString()
        };
    }
}

module.exports = MLService; 