import { useEnergyData } from '../../context/EnergyDataContext'
import '../../styles/dashboard/EnergyOverview.css'

const EnergyOverview = () => {
  const { forecastData } = useEnergyData()

  // Dummy data (replace with actual data from API)
  const energyData = {
    solarGeneration: 2500,
    windGeneration: 1800,
    totalEfficiency: 85,
    carbonSaved: 450
  }

  return (
    <div className="energy-overview card">
      <h3>Energy Generation Overview</h3>
      <div className="overview-grid">
        <div className="overview-item">
          <span className="label">Solar Generation</span>
          <span className="value">{energyData.solarGeneration} kWh</span>
          <span className="trend positive">+12% ↑</span>
        </div>
        <div className="overview-item">
          <span className="label">Wind Generation</span>
          <span className="value">{energyData.windGeneration} kWh</span>
          <span className="trend positive">+8% ↑</span>
        </div>
        <div className="overview-item">
          <span className="label">Overall Efficiency</span>
          <span className="value">{energyData.totalEfficiency}%</span>
          <span className="trend neutral">±0%</span>
        </div>
        <div className="overview-item">
          <span className="label">Carbon Saved</span>
          <span className="value">{energyData.carbonSaved} tons</span>
          <span className="trend positive">+15% ↑</span>
        </div>
      </div>
    </div>
  )
}

export default EnergyOverview 