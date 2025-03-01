import tensorflow as tf
import numpy as np
import joblib
from pathlib import Path

class WeatherModel:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.model_path = Path(__file__).parent / "models"
        
    def load_model(self, model_name="weather_model.h5"):
        """Load the trained model and scaler"""
        try:
            self.model = tf.keras.models.load_model(str(self.model_path / model_name))
            self.scaler = joblib.load(str(self.model_path / "scaler.pkl"))
            return True
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            return False
            
    def preprocess_data(self, data):
        """Preprocess input data"""
        features = np.array([[
            data['temperature'],
            data['humidity'],
            data['windSpeed'],
            data['solarIrradiance']
        ]])
        if self.scaler:
            features = self.scaler.transform(features)
        return features
        
    def predict(self, data):
        """Make predictions using the loaded model"""
        if self.model is None:
            raise ValueError("Model not loaded")
            
        try:
            # Preprocess the input data
            processed_data = self.preprocess_data(data)
            
            # Make prediction
            prediction = self.model.predict(processed_data)
            
            # Convert prediction to desired format
            result = {
                'prediction': float(prediction[0][0]),
                'confidence': float(np.max(prediction))
            }
            
            return result
        except Exception as e:
            raise Exception(f"Prediction error: {str(e)}")
            
    def get_model_info(self):
        """Get model information"""
        return {
            'name': 'Weather Prediction Model',
            'version': '1.0',
            'input_features': ['temperature', 'humidity', 'windSpeed', 'solarIrradiance'],
            'output_features': ['prediction'],
            'model_loaded': self.model is not None
        } 