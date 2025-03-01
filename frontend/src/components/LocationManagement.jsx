import { useState } from 'react'
import { useEnergyData } from '../context/EnergyDataContext'
import '../styles/LocationManagement.css'

const LocationManagement = () => {
  const { selectedLocation, setSelectedLocation, locations, addLocation } = useEnergyData()
  const [newLocation, setNewLocation] = useState({ name: '', latitude: '', longitude: '' })
  const [error, setError] = useState('')

  const validateLocation = (location) => {
    if (!location.name.trim()) return 'Location name is required'
    if (!location.latitude.trim()) return 'Latitude is required'
    if (!location.longitude.trim()) return 'Longitude is required'
    
    // Basic latitude format validation
    if (!location.latitude.match(/^\d+(\.\d+)?°\s*[NS]$/)) {
      return 'Invalid latitude format. Use format: "28.6139° N" or "28.6139° S"'
    }
    
    // Basic longitude format validation
    if (!location.longitude.match(/^\d+(\.\d+)?°\s*[EW]$/)) {
      return 'Invalid longitude format. Use format: "77.2090° E" or "77.2090° W"'
    }
    
    return ''
  }

  const handleAddLocation = (e) => {
    e.preventDefault()
    const validationError = validateLocation(newLocation)
    if (validationError) {
      setError(validationError)
      return
    }
    
    setError('')
    const addedLocation = addLocation(newLocation)
    setNewLocation({ name: '', latitude: '', longitude: '' })
    setSelectedLocation(addedLocation.id)
  }

  return (
    <div className="locations">
      <h1>Manage Locations</h1>
      
      <div className="locations-grid">
        <div className="locations-list">
          <h3>Saved Locations</h3>
          {locations.map(location => (
            <div 
              key={location.id} 
              className={`location-card ${selectedLocation === location.id ? 'active' : ''}`}
              onClick={() => setSelectedLocation(location.id)}
            >
              <h4>{location.name}</h4>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
              <p>Region: {location.region}</p>
            </div>
          ))}
        </div>

        <div className="add-location">
          <h3>Add New Location</h3>
          <form onSubmit={handleAddLocation}>
            <input
              type="text"
              placeholder="Location Name"
              value={newLocation.name}
              onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Latitude (e.g., 28.6139° N)"
              value={newLocation.latitude}
              onChange={(e) => setNewLocation(prev => ({ ...prev, latitude: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Longitude (e.g., 77.2090° E)"
              value={newLocation.longitude}
              onChange={(e) => setNewLocation(prev => ({ ...prev, longitude: e.target.value }))}
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Add Location</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LocationManagement 