import { useState } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import '../styles/Analytics.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week')
  const [energyType, setEnergyType] = useState('all')

  // Dummy data for metrics
  const metrics = {
    efficiency: 85,
    totalGeneration: 1250,
    carbonOffset: 875,
    savings: 12500,
    availability: 98.5,
    peakDemand: 2100
  }

  // Energy consumption trend data
  const trendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Consumption',
        data: [1800, 2200, 1950, 2400, 2100, 1700, 1600],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // Source distribution data
  const sourceData = {
    labels: ['Solar', 'Wind', 'Grid'],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: ['#FF6B00', '#00B0FF', '#666666'],
      borderWidth: 0
    }]
  }

  // Peak hours data
  const peakHoursData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      label: 'Energy Demand (kW)',
      data: [1200, 800, 1900, 2400, 2200, 1800],
      backgroundColor: '#4CAF50'
    }]
  }

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <div className="header-title">
          <h1>Energy Analytics</h1>
          <span className="subtitle">Comprehensive energy insights and analysis</span>
        </div>
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

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon efficiency"></div>
          <div className="metric-content">
            <h3>System Efficiency</h3>
            <div className="metric-value">{metrics.efficiency}%</div>
            <div className="metric-trend positive">↑ 2.3% vs last week</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon generation"></div>
          <div className="metric-content">
            <h3>Total Generation</h3>
            <div className="metric-value">{metrics.totalGeneration} MWh</div>
            <div className="metric-trend positive">↑ 150 MWh vs last week</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon carbon"></div>
          <div className="metric-content">
            <h3>Carbon Offset</h3>
            <div className="metric-value">{metrics.carbonOffset} tons</div>
            <div className="metric-trend positive">↑ 12% vs last month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon savings"></div>
          <div className="metric-content">
            <h3>Cost Savings</h3>
            <div className="metric-value">₹{metrics.savings.toLocaleString()}</div>
            <div className="metric-trend positive">↑ 8.5% vs last month</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card consumption-trend">
          <h3>Energy Consumption Trend</h3>
          <div className="chart-container">
            <Line data={trendData} options={commonOptions} />
          </div>
        </div>
        
        <div className="chart-card source-distribution">
          <h3>Energy Source Distribution</h3>
          <div className="chart-container donut-container">
            <Doughnut data={sourceData} options={{
              ...commonOptions,
              cutout: '70%',
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom'
                }
              }
            }} />
          </div>
        </div>

        <div className="chart-card peak-hours">
          <h3>Peak Hours Analysis</h3>
          <div className="chart-container">
            <Bar data={peakHoursData} options={commonOptions} />
          </div>
        </div>

        <div className="stats-card">
          <h3>Key Performance Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">System Availability</span>
              <span className="stat-value">{metrics.availability}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Peak Demand</span>
              <span className="stat-value">{metrics.peakDemand} kW</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Energy Efficiency</span>
              <span className="stat-value">A+</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Grid Dependency</span>
              <span className="stat-value">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics