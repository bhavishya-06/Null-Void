import { useState } from 'react'
import { useEnergyData } from '../context/EnergyDataContext'
import '../styles/LocationSelector.css'

const LocationSelector = () => {
  const { selectedLocation, setSelectedLocation, fetchLocationData, loading } = useEnergyData()
  const [locations] = useState([
    { id: 'Delhi', name: 'Delhi', region: 'North India' },
    { id: 'Mumbai', name: 'Mumbai', region: 'West India' },
    { id: 'Bangalore', name: 'Bangalore', region: 'South India' },
    { id: 'Chennai', name: 'Chennai', region: 'South India' },
    { id: 'Kolkata', name: 'Kolkata', region: 'East India' }
  ])

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleViewDetails = () => {
    if (selectedLocation) {
      fetchLocationData(selectedLocation);
    }
  };

  return (
    <div className="location-selector">
      <div className="selector-wrapper">
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={selectedLocation || ''}
          onChange={(e) => handleLocationChange(e.target.value)}
          disabled={loading}
        >
          <option value="">Select Location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name} - {location.region}
            </option>
          ))}
        </select>
      </div>
      {selectedLocation && (
        <button 
          className="location-details"
          onClick={handleViewDetails}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'View Details'}
        </button>
      )}
    </div>
  )
}

export default LocationSelector