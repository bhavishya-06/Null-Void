import { useEnergyData } from '../../context/EnergyDataContext'
import '../../styles/dashboard/WeatherInfo.css'

const WeatherInfo = () => {
  const { selectedLocation } = useEnergyData()

  // Dummy weather data (replace with actual API data)
  const weatherData = {
    temperature: 28,
    windSpeed: 15,
    solarIrradiance: 850,
    humidity: 65,
    cloudCover: 20
  }

  return (
    <div className="weather-info card">
      <h3>Current Weather Conditions</h3>
      <div className="weather-grid">
        <div className="weather-item">
          <i className="weather-icon temperature"></i>
          <div className="weather-detail">
            <span className="label">Temperature</span>
            <span className="value">{weatherData.temperature}°C</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon wind"></i>
          <div className="weather-detail">
            <span className="label">Wind Speed</span>
            <span className="value">{weatherData.windSpeed} km/h</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon sun"></i>
          <div className="weather-detail">
            <span className="label">Solar Irradiance</span>
            <span className="value">{weatherData.solarIrradiance} W/m²</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon humidity"></i>
          <div className="weather-detail">
            <span className="label">Humidity</span>
            <span className="value">{weatherData.humidity}%</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon cloud"></i>
          <div className="weather-detail">
            <span className="label">Cloud Cover</span>
            <span className="value">{weatherData.cloudCover}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo 