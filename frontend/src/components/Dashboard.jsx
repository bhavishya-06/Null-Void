import EnergyOverview from './dashboard/EnergyOverview'
import WeatherInfo from './dashboard/WeatherInfo'
import ForecastChart from './dashboard/ForecastChart'
import LocationSelector from './LocationSelector'
import { useState, useEffect } from 'react'
import { useEnergyData } from '../context/EnergyDataContext'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const { selectedLocation, predictionData, loading } = useEnergyData()
  const [quickStats, setQuickStats] = useState({
    totalPower: '0 MW',
    efficiency: '0%',
    savings: '₹0',
    carbonReduced: '0 tons'
  })

  useEffect(() => {
    // Update quick stats based on predictions
    if (predictionData?.success && predictionData.predictions) {
      const totalPower = predictionData.predictions.reduce((sum, p) => sum + p.solar + p.wind, 0) / 1000;
      const efficiency = ((totalPower / (24 * 5)) * 100).toFixed(1); // Assuming 5MW max capacity
      const savings = (totalPower * 1000).toFixed(0); // Rough estimate of ₹1000 per MWh
      const carbonReduced = (totalPower * 0.7).toFixed(1); // Rough estimate of 0.7 tons CO2 per MWh

      setQuickStats({
        totalPower: `${totalPower.toFixed(1)} MW`,
        efficiency: `${efficiency}%`,
        savings: `₹${savings}`,
        carbonReduced: `${carbonReduced} tons`
      });
    }
  }, [predictionData]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Energy Forecast Dashboard</h1>
          <p className="header-subtitle">Real-time monitoring and analytics</p>
        </div>
        <div className="header-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
            disabled={loading}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <LocationSelector />
        </div>
      </div>
      
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon power"></div>
          <div className="stat-content">
            <h4>Total Power</h4>
            <div className="stat-value">{quickStats.totalPower}</div>
            <div className="stat-trend positive">↑ Based on 24h forecast</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon efficiency"></div>
          <div className="stat-content">
            <h4>System Efficiency</h4>
            <div className="stat-value">{quickStats.efficiency}</div>
            <div className="stat-trend positive">↑ Of max capacity</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon savings"></div>
          <div className="stat-content">
            <h4>Cost Savings</h4>
            <div className="stat-value">{quickStats.savings}</div>
            <div className="stat-trend positive">↑ Estimated savings</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon carbon"></div>
          <div className="stat-content">
            <h4>Carbon Reduced</h4>
            <div className="stat-value">{quickStats.carbonReduced}</div>
            <div className="stat-trend positive">↑ CO2 reduction</div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <ForecastChart />
        <EnergyOverview />
        <WeatherInfo />
      </div>
    </div>
  )
}

export default Dashboard 