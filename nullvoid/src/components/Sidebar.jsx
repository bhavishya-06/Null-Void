import { NavLink } from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>EnergyForecast</h2>
      </div>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/forecasts">Forecasts</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/locations">Locations</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </div>
  )
}

export default Sidebar 