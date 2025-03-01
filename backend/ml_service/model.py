import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib
import requests
import os 
from dotenv import load_dotenv
from datetime import datetime, timedelta

if os.path.exists(".env"):
    load_dotenv()

OPENCAGE_API_KEY = os.getenv("OPENCAGE_API_KEY")
if not OPENCAGE_API_KEY:
    print("Error: OPENCAGE_API_KEY is not set in the .env file.")
    exit()

df = pd.read_csv("rajasthan_solar_wind_data_updated.csv")
df["DateTime"] = pd.to_datetime(df["DateTime"])
df = df.set_index("DateTime")

features = ["Solar Irradiance (W/m²)", "Temperature (°C)", "Cloud Cover (%)", "Wind Speed (m/s)", "Air Pressure (hPa)"]
targets = ["Solar Power Output (kWh)", "Wind Power Output (kWh)"]

scaler_features = MinMaxScaler()
scaler_targets = MinMaxScaler()
df_scaled_features = scaler_features.fit_transform(df[features])
df_scaled_targets = scaler_targets.fit_transform(df[targets])
df_scaled = pd.DataFrame(df_scaled_features, columns=features, index=df.index)
df_scaled[targets] = df_scaled_targets
df_scaled = pd.DataFrame(df_scaled, columns=features + targets, index=df.index)

sequence_length = 24  # Use last 24 hours as input

def create_sequences(data, target_columns, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data.iloc[i:i+seq_length][features].values)
        y.append(data.iloc[i+seq_length][target_columns].values)
    return np.array(X), np.array(y)

X, y = create_sequences(df_scaled, targets, sequence_length)

split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

model = Sequential([
    LSTM(100, return_sequences=True, input_shape=(sequence_length, len(features))),
    Dropout(0.2),
    LSTM(50, return_sequences=False),
    Dropout(0.2),
    Dense(50, activation="relu"),
    Dense(len(targets), activation="linear")  
])

model.compile(optimizer="adam", loss="mse", metrics=["mae"])
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test))

model.save("energy_forecast_model.h5")
joblib.dump(scaler_features, "scaler_features.pkl")
joblib.dump(scaler_targets, "scaler_targets.pkl")

location_name = input("Enter the location (City, Country): ")

GEOCODE_URL = f"https://api.opencagedata.com/geocode/v1/json?q={location_name}&key={OPENCAGE_API_KEY}"
geo_response = requests.get(GEOCODE_URL).json()

if "results" not in geo_response or len(geo_response["results"]) == 0:
    print("Location not found. Full API response:", geo_response)
    exit()

LATITUDE = geo_response["results"][0]["geometry"]["lat"]
LONGITUDE = geo_response["results"][0]["geometry"]["lng"]

print(f"LATITUDE: {LATITUDE}, LONGITUDE: {LONGITUDE}")  

def get_weather_data(LATITUDE, LONGITUDE):
    all_data = []
    current_date = datetime.now() - timedelta(days=1)
    
    while len(all_data) < 24:
        date_str = current_date.strftime("%Y-%m-%d")
        url = f"https://archive-api.open-meteo.com/v1/archive?latitude={LATITUDE}&longitude={LONGITUDE}&start_date={date_str}&end_date={date_str}&hourly=temperature_2m,cloudcover,shortwave_radiation,wind_speed_10m,surface_pressure&timezone=auto"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            hourly_data = data["hourly"]
            
            df = pd.DataFrame({
                "timestamp": pd.to_datetime(hourly_data["time"]),
                "Temperature (°C)": hourly_data["temperature_2m"],
                "Cloud Cover (%)": hourly_data["cloudcover"],
                "Solar Irradiance (W/m²)": hourly_data["shortwave_radiation"],
                "Wind Speed (m/s)": hourly_data["wind_speed_10m"],
                "Air Pressure (hPa)": hourly_data["surface_pressure"],
            })
            
            valid_entries = df.dropna().to_dict(orient="records")
            all_data.extend(valid_entries)
        
        current_date -= timedelta(days=1)
    
    final_df = pd.DataFrame(all_data).sort_values("timestamp").tail(24)
    
    if len(final_df) < 24:
        print("Insufficient weather data. Try again later.")
        return None
    
    return final_df

def predict_energy():
    past_24_hours = get_weather_data(LATITUDE, LONGITUDE)
    if past_24_hours is None or len(past_24_hours) < 24:
        return

    model = tf.keras.models.load_model("energy_forecast_model.h5", compile=False)
    model.compile(optimizer="adam", loss=tf.keras.losses.MeanSquaredError(), metrics=["mae"])
    scaler_features = joblib.load("scaler_features.pkl")
    scaler_targets = joblib.load("scaler_targets.pkl")

    past_24_hours = past_24_hours[features]
    past_24_scaled = scaler_features.transform(past_24_hours)
    X_input = np.array(past_24_scaled).reshape(1, 24, past_24_scaled.shape[1])

    predictions_scaled = []
    
    for _ in range(30):  # Predict 30 future hours
        prediction_scaled = model.predict(X_input)
        predictions_scaled.append(prediction_scaled[0])

        # Update input by appending the new prediction and removing the oldest hour
        new_input = np.roll(X_input, shift=-1, axis=1)
        new_input[0, -1, :-2] = X_input[0, -2, :-2]  # Keep same weather inputs
        new_input[0, -1, -2:] = prediction_scaled  # Add the new predictions
        X_input = new_input

    predicted_output = scaler_targets.inverse_transform(np.array(predictions_scaled))

    print("\n--- 30-Hour Energy Forecast ---")
    for i in range(30):
        print(f"Hour {i+1}: Solar Power Output = {predicted_output[i, 0]:.2f} kWh, Wind Power Output = {predicted_output[i, 1]:.2f} kWh")

predict_energy()
