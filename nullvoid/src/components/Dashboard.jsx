import EnergyOverview from './dashboard/EnergyOverview'
import WeatherInfo from './dashboard/WeatherInfo'
import ForecastChart from './dashboard/ForecastChart'
import LocationSelector from './LocationSelector'
import { useState } from 'react'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h')

  // Quick stats data (replace with actual API data)
  const quickStats = {
    totalPower: '3.8 MW',
    efficiency: '92%',
    savings: '₹45,000',
    carbonReduced: '2.5 tons'
  }

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
            <div className="stat-trend positive">↑ 5.2% vs yesterday</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon efficiency"></div>
          <div className="stat-content">
            <h4>System Efficiency</h4>
            <div className="stat-value">{quickStats.efficiency}</div>
            <div className="stat-trend positive">↑ 2.1% vs last week</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon savings"></div>
          <div className="stat-content">
            <h4>Cost Savings</h4>
            <div className="stat-value">{quickStats.savings}</div>
            <div className="stat-trend positive">↑ 12% this month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon carbon"></div>
          <div className="stat-content">
            <h4>Carbon Reduced</h4>
            <div className="stat-value">{quickStats.carbonReduced}</div>
            <div className="stat-trend positive">↑ 8.5% vs target</div>
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