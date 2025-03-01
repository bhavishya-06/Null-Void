import { useEnergyData } from '../../context/EnergyDataContext'
import '../../styles/dashboard/WeatherInfo.css'

const WeatherInfo = () => {
  const { weatherData } = useEnergyData()

  const displayData = weatherData || {
    temperature: 0,
    windSpeed: 0,
    solarIrradiance: 0,
    humidity: 0,
    cloudCover: 0
  };

  return (
    <div className="weather-info card">
      <h3>Current Weather Conditions</h3>
      <div className="weather-grid">
        <div className="weather-item">
          <i className="weather-icon temperature"></i>
          <div className="weather-detail">
            <span className="label">Temperature</span>
            <span className="value">{displayData.temperature}°C</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon wind"></i>
          <div className="weather-detail">
            <span className="label">Wind Speed</span>
            <span className="value">{displayData.windSpeed} km/h</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon sun"></i>
          <div className="weather-detail">
            <span className="label">Solar Irradiance</span>
            <span className="value">{displayData.solarIrradiance} W/m²</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon humidity"></i>
          <div className="weather-detail">
            <span className="label">Humidity</span>
            <span className="value">{displayData.humidity}%</span>
          </div>
        </div>
        <div className="weather-item">
          <i className="weather-icon cloud"></i>
          <div className="weather-detail">
            <span className="label">Cloud Cover</span>
            <span className="value">{displayData.cloudCover}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo 