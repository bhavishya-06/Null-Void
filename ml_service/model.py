import argparse
import json
import joblib
import numpy as np
from datetime import datetime, timedelta
import requests
from dotenv import load_dotenv
import os

load_dotenv()

def get_weather_data(location):
    try:
        response = requests.get(f'http://localhost:5000/api/weather?location={location}')
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"Error fetching weather data: {str(e)}")
        return None

def generate_hourly_predictions(model, weather_data):
    predictions = []
    current_hour = datetime.now().hour

    for i in range(24):  # Generate 24 hours of predictions
        hour = (current_hour + i) % 24
        time = f"{hour:02d}:00"
        
        # Use weather data to make prediction
        features = np.array([[
            weather_data['temperature'],
            weather_data['windSpeed'],
            weather_data['solarIrradiance'],
            weather_data['humidity'],
            weather_data['cloudCover'],
            np.sin(2 * np.pi * hour / 24)  # Time of day feature
        ]])
        
        prediction = model.predict(features)[0]
        
        # Split prediction into solar and wind components based on time of day
        solar_factor = np.sin(np.pi * hour / 12) if 6 <= hour <= 18 else 0
        wind_factor = 1 - (0.3 * solar_factor)  # Wind tends to be stronger at night
        
        solar_output = max(0, prediction * solar_factor)
        wind_output = max(0, prediction * wind_factor)
        
        predictions.append({
            'time': time,
            'solar_output': round(float(solar_output), 2),
            'wind_output': round(float(wind_output), 2)
        })
    
    return predictions

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--location', required=True, help='Location for weather data')
    parser.add_argument('--mode', choices=['train', 'predict'], default='predict', help='Mode of operation')
    args = parser.parse_args()

    try:
        # Load the model
        model = joblib.load('ml_service/model.pkl')
        
        if args.mode == 'predict':
            # Get weather data
            weather_data = get_weather_data(args.location)
            if not weather_data:
                raise Exception("Failed to get weather data")
            
            # Generate predictions
            predictions = generate_hourly_predictions(model, weather_data)
            
            # Print predictions as JSON
            print(json.dumps(predictions))
            
    except Exception as e:
        print(json.dumps({
            'error': str(e)
        }))
        exit(1)

if __name__ == "__main__":
    main() 