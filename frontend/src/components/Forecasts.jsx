import { useState } from 'react'
import { useEnergyData } from '../context/EnergyDataContext'
import '../styles/Forecasts.css'

const Forecasts = () => {
  const { loading, forecastData } = useEnergyData()
  const [forecastRange, setForecastRange] = useState('24h')

  const dummyForecasts = [
    { time: '09:00', solar: 75, wind: 45, probability: 90 },
    { time: '12:00', solar: 95, wind: 30, probability: 85 },
    { time: '15:00', solar: 85, wind: 50, probability: 88 },
    { time: '18:00', solar: 45, wind: 65, probability: 92 },
  ]

  return (
    <div className="forecasts">
      <div className="forecasts-header">
        <h1>Energy Generation Forecasts</h1>
        <div className="forecast-controls">
          <select value={forecastRange} onChange={(e) => setForecastRange(e.target.value)}>
            <option value="24h">Next 24 Hours</option>
            <option value="48h">Next 48 Hours</option>
            <option value="7d">Next 7 Days</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading forecasts...</div>
      ) : (
        <>
          <div className="forecast-summary">
            <div className="summary-card">
              <h3>Solar Forecast</h3>
              <div className="forecast-value">85%</div>
              <p>Expected Efficiency</p>
            </div>
            <div className="summary-card">
              <h3>Wind Forecast</h3>
              <div className="forecast-value">65%</div>
              <p>Expected Efficiency</p>
            </div>
            <div className="summary-card">
              <h3>Combined Output</h3>
              <div className="forecast-value">75%</div>
              <p>Overall Efficiency</p>
            </div>
          </div>

          <div className="forecast-details">
            <h3>Hourly Forecast</h3>
            <table className="forecast-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Solar Output (%)</th>
                  <th>Wind Output (%)</th>
                  <th>Forecast Probability</th>
                </tr>
              </thead>
              <tbody>
                {dummyForecasts.map((forecast, index) => (
                  <tr key={index}>
                    <td>{forecast.time}</td>
                    <td>{forecast.solar}%</td>
                    <td>{forecast.wind}%</td>
                    <td>{forecast.probability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Forecasts
