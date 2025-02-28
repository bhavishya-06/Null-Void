import { useState } from 'react'
import { useEnergyData } from '../context/EnergyDataContext'
import '../styles/Analytics.css'

const Analytics = () => {
  const { forecastData } = useEnergyData()
  const [timeRange, setTimeRange] = useState('week')
  const [energyType, setEnergyType] = useState('all')

  const dummyData = {
    efficiency: 85,
    totalGeneration: 1250,
    peakHours: 6,
    savings: 12500
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Energy Analytics</h1>
        <div className="analytics-controls">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <select value={energyType} onChange={(e) => setEnergyType(e.target.value)}>
            <option value="all">All Sources</option>
            <option value="solar">Solar Only</option>
            <option value="wind">Wind Only</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Efficiency Rate</h3>
          <div className="metric">{dummyData.efficiency}%</div>
        </div>
        <div className="analytics-card">
          <h3>Total Generation</h3>
          <div className="metric">{dummyData.totalGeneration} MWh</div>
        </div>
        <div className="analytics-card">
          <h3>Peak Generation Hours</h3>
          <div className="metric">{dummyData.peakHours} hours</div>
        </div>
        <div className="analytics-card">
          <h3>Cost Savings</h3>
          <div className="metric">₹{dummyData.savings}</div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-container">
          <h3>Generation Trends</h3>
          {/* charts will be added here*/}
          <div className="placeholder-chart">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
