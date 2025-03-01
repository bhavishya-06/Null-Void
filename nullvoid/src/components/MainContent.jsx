import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Forecasts from './Forecasts'
import Analytics from './Analytics'
import Locations from './Locations'
import Settings from './Settings'
import APIIntegration from './APIIntegration'
import '../styles/MainContent.css'

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/forecasts" element={<Forecasts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/api-integration" element={<APIIntegration />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default MainContent 