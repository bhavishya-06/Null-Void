import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/Sidebar.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768)

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`sidebar-container ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar">
          <div className="logo">
            <h2>EnergyForecast</h2>
          </div>
          <nav>
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/forecasts">Forecasts</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
            <NavLink to="/locations">Locations</NavLink>
            <NavLink to="/api-integration">API Integration</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </nav>
        </div>
      </div>
      
      {isOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  )
}

export default Sidebar 