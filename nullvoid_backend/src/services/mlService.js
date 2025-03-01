const { spawn } = require('child_process');
const path = require('path');

class MLService {
    constructor() {
        this.pythonProcess = null;
        this.modelStatus = 'not_loaded';
        this.modelInfo = {
            name: 'weather_prediction_model',
            version: '1.0.0',
            type: 'tensorflow',
            inputFeatures: ['temperature', 'humidity', 'windSpeed', 'solarIrradiance'],
            outputFeatures: ['prediction']
        };
    }

    async loadModel() {
        try {
            // Start Python process
            const pythonScript = path.join(__dirname, '../ml_service/model.py');
            this.pythonProcess = spawn('python', [pythonScript]);

            // Handle Python process output
            this.pythonProcess.stdout.on('data', (data) => {
                console.log(`Python Output: ${data}`);
            });

            this.pythonProcess.stderr.on('data', (data) => {
                console.error(`Python Error: ${data}`);
            });

            this.modelStatus = 'loaded';
            return {
                status: this.modelStatus,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            this.modelStatus = 'error';
            throw error;
        }
    }

    async predict(data) {
        if (this.modelStatus !== 'loaded') {
            throw new Error('Model not loaded');
        }

        try {
            // Send data to Python process
            this.pythonProcess.stdin.write(JSON.stringify(data) + '\n');

            // Get prediction from Python process
            return new Promise((resolve, reject) => {
                this.pythonProcess.stdout.once('data', (output) => {
                    try {
                        const prediction = JSON.parse(output);
                        resolve(prediction);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getStatus() {
        return {
            status: this.modelStatus,
            lastUpdated: new Date().toISOString(),
            pythonProcess: this.pythonProcess ? 'running' : 'not running'
        };
    }

    async getModelInfo() {
        return {
            ...this.modelInfo,
            status: this.modelStatus
        };
    }

    async getModelMetrics() {
        // This would typically come from the Python model
        return {
            accuracy: 0.95,
            precision: 0.94,
            recall: 0.93,
            f1Score: 0.94,
            lastUpdated: new Date().toISOString()
        };
    }
}

module.exports = new MLService(); 