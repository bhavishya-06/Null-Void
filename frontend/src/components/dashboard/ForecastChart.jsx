import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useEnergyData } from '../../context/EnergyDataContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import '../../styles/dashboard/ForecastChart.css'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const ForecastChart = () => {
  const [timeframe, setTimeframe] = useState('24h')
  const { predictionData, loading } = useEnergyData()

  const predictions = predictionData?.success && predictionData.predictions ? predictionData.predictions : [];

  const chartData = {
    labels: predictions.map(d => d.time),
    datasets: [
      {
        label: 'Solar Generation',
        data: predictions.map(d => d.solar),
        borderColor: '#FF6B00',
        backgroundColor: 'rgba(255, 107, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FF6B00',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        borderWidth: 2
      },
      {
        label: 'Wind Generation',
        data: predictions.map(d => d.wind),
        borderColor: '#00B0FF',
        backgroundColor: 'rgba(0, 176, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#00B0FF',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        borderWidth: 2
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif"
        },
        titleFont: {
          size: 12,
          weight: '600',
          family: "'Inter', sans-serif"
        },
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          title: function(context) {
            return `Time: ${context[0].label}`
          },
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} kWh`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          },
          color: '#666',
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit: 12,
          padding: 8
        },
        border: {
          display: false
        }
      },
      y: {
        position: 'right',
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
          drawBorder: false,
          lineWidth: 1
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          },
          color: '#666',
          padding: 8,
          maxTicksLimit: 6,
          callback: function(value) {
            if (value >= 1000) {
              return (value/1000).toFixed(1) + 'k kWh'
            }
            return value + ' kWh'
          }
        },
        border: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
      axis: 'x'
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 4,
        bottom: 0
      }
    }
  }

  return (
    <div className="forecast-chart card">
      <div className="chart-header">
        <div className="chart-title">
          <h3>Energy Generation Forecast</h3>
          <span className="subtitle">Real-time generation data</span>
        </div>
        <select 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
          className="timeframe-select"
          disabled={loading}
        >
          <option value="24h">Next 24 Hours</option>
          <option value="7d">Next 7 Days</option>
          <option value="30d">Next 30 Days</option>
        </select>
      </div>
      <div className="chart-wrapper">
        <div className="chart-container">
          {loading ? (
            <div className="loading-overlay">Loading forecast data...</div>
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
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