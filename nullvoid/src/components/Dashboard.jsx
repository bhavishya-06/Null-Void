import EnergyOverview from './dashboard/EnergyOverview'
import WeatherInfo from './dashboard/WeatherInfo'
import ForecastChart from './dashboard/ForecastChart'
import LocationSelector from './LocationSelector'
import '../styles/Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Energy Forecast Dashboard</h1>
        <LocationSelector />
      </div>
      
      <div className="dashboard-grid">
        <EnergyOverview />
        <WeatherInfo />
        <ForecastChart />
      </div>
    </div>
  )
}

export default Dashboard 