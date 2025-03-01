import { useState } from 'react'
import { useEnergyData } from '../context/EnergyDataContext'
import '../styles/Locations.css'

const Locations = () => {
  const { selectedLocation, setSelectedLocation } = useEnergyData()
  const [newLocation, setNewLocation] = useState({ name: '', latitude: '', longitude: '' })
  const [locations, setLocations] = useState([
    { id: 1, name: 'Solar Farm A', latitude: '28.6139° N', longitude: '77.2090° E' },
    { id: 2, name: 'Wind Farm B', latitude: '19.0760° N', longitude: '72.8777° E' },
  ])

  const handleAddLocation = (e) => {
    e.preventDefault()
    setLocations(prev => [...prev, { id: Date.now(), ...newLocation }])
    setNewLocation({ name: '', latitude: '', longitude: '' })
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
              placeholder="Latitude"
              value={newLocation.latitude}
              onChange={(e) => setNewLocation(prev => ({ ...prev, latitude: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Longitude"
              value={newLocation.longitude}
              onChange={(e) => setNewLocation(prev => ({ ...prev, longitude: e.target.value }))}
            />
            <button type="submit">Add Location</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Locations
