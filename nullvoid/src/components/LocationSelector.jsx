import { useEnergyData } from '../context/EnergyDataContext'
import '../styles/LocationSelector.css'

const LocationSelector = () => {
  const { selectedLocation, setSelectedLocation } = useEnergyData()

  // Dummy locations data (replace with API data)
  const locations = [
    { id: 1, name: 'Solar Farm A', region: 'North India' },
    { id: 2, name: 'Wind Farm B', region: 'West Coast' },
    { id: 3, name: 'Hybrid Plant C', region: 'Central India' },
    { id: 4, name: 'Solar Park D', region: 'South India' }
  ]

  return (
    <div className="location-selector">
      <div className="selector-wrapper">
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={selectedLocation || ''}
          onChange={(e) => setSelectedLocation(Number(e.target.value))}
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
          onClick={() => {/* Navigate to location details */}}
        >
          View Details
        </button>
      )}
    </div>
  )
}

export default LocationSelector