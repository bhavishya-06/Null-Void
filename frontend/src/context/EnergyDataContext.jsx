import { createContext, useContext, useState, useEffect } from 'react'

const EnergyDataContext = createContext()

export const EnergyDataProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [predictionData, setPredictionData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLocationData = async (location) => {
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // First get weather data
      const weatherRes = await fetch(`http://localhost:5000/api/weather?location=${encodeURIComponent(location)}`);
      const weatherJson = await weatherRes.json();

      if (!weatherRes.ok) throw new Error(weatherJson.error || 'Failed to fetch weather data');

      // Generate mock weather data since the API doesn't provide it yet
      const mockWeatherData = {
        ...weatherJson,
        temperature: Math.round(20 + Math.random() * 15),
        windSpeed: Math.round(5 + Math.random() * 20),
        solarIrradiance: Math.round(200 + Math.random() * 800),
        humidity: Math.round(40 + Math.random() * 40),
        cloudCover: Math.round(Math.random() * 100)
      };

      setWeatherData(mockWeatherData);

      // Then get prediction data
      const predictionRes = await fetch(`http://localhost:5000/api/ml/predict?location=${encodeURIComponent(location)}`);
      const predictionJson = await predictionRes.json();

      if (!predictionRes.ok) throw new Error(predictionJson.error || 'Failed to fetch prediction data');

      // If we don't have real prediction data, generate mock data
      if (!predictionJson.success || !predictionJson.predictions) {
        const mockPredictions = Array.from({ length: 24 }, (_, i) => {
          const hour = i;
          const time = `${hour.toString().padStart(2, '0')}:00`;
          const solarFactor = hour >= 6 && hour <= 18 ? Math.sin((hour - 6) * Math.PI / 12) : 0;
          
          return {
            time,
            solar: Math.round(Math.max(0, solarFactor * 2000 + (Math.random() * 200 - 100))),
            wind: Math.round(800 + Math.sin(i * 0.5) * 400 + (Math.random() * 300))
          };
        });

        setPredictionData({
          success: true,
          predictions: mockPredictions
        });
      } else {
        setPredictionData(predictionJson);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      
      // Set mock data even on error for demo purposes
      setWeatherData({
        temperature: 25,
        windSpeed: 15,
        solarIrradiance: 600,
        humidity: 60,
        cloudCover: 30
      });

      setPredictionData({
        success: true,
        predictions: Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          solar: Math.round(1000 + Math.random() * 1000),
          wind: Math.round(500 + Math.random() * 800)
        }))
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever location changes
  useEffect(() => {
    fetchLocationData(selectedLocation);
  }, [selectedLocation]);

  return (
    <EnergyDataContext.Provider 
      value={{ 
        selectedLocation,
        setSelectedLocation,
        weatherData,
        predictionData,
        loading,
        error,
        fetchLocationData
      }}
    >
      {children}
    </EnergyDataContext.Provider>
  )
}

export const useEnergyData = () => useContext(EnergyDataContext) 