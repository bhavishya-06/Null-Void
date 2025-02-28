import { useState } from 'react'
import { useEnergyData } from '../../context/EnergyDataContext'
import '../../styles/dashboard/ForecastChart.css'

const ForecastChart = () => {
  const [timeframe, setTimeframe] = useState('24h')
  const { forecastData } = useEnergyData()

  return (
    <div className="forecast-chart card">
      <div className="chart-header">
        <h3>Energy Generation Forecast</h3>
        <select 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="24h">Next 24 Hours</option>
          <option value="7d">Next 7 Days</option>
          <option value="30d">Next 30 Days</option>
        </select>
      </div>
      <div className="chart-container">
        {/* Replace this with actual chart component */}
        <div className="placeholder-chart">
          <p>Chart will be displayed here</p>
          <p>Consider using libraries like recharts or chart.js</p>
        </div>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color solar"></span>
          <span>Solar Generation</span>
        </div>
        <div className="legend-item">
          <span className="legend-color wind"></span>
          <span>Wind Generation</span>
        </div>
      </div>
    </div>
  )
}

export default ForecastChart 