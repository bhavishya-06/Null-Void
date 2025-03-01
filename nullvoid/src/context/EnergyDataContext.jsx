import { createContext, useContext, useState, useEffect } from 'react'

const EnergyDataContext = createContext()

export const EnergyDataProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState([
    { id: 1, name: 'Solar Farm A', latitude: '28.6139° N', longitude: '77.2090° E', region: 'North India' },
    { id: 2, name: 'Wind Farm B', latitude: '19.0760° N', longitude: '72.8777° E', region: 'West Coast' },
  ])

  const addLocation = (newLocation) => {
    const locationWithId = {
      ...newLocation,
      id: Date.now(),
      region: `${newLocation.latitude.includes('N') ? 'North' : 'South'} Region`
    }
    setLocations(prev => [...prev, locationWithId])
    return locationWithId
  }

  const fetchForecastData = async (location) => {
    setLoading(true)
    try {
      // API call implementation here
      // const response = await api.getForecast(location)
      // setForecastData(response.data)
    } catch (error) {
      console.error('Error fetching forecast data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedLocation) {
      fetchForecastData(selectedLocation)
    }
  }, [selectedLocation])

  return (
    <EnergyDataContext.Provider 
      value={{ 
        selectedLocation, 
        setSelectedLocation, 
        forecastData, 
        loading,
        locations,
        addLocation
      }}
    >
      {children}
    </EnergyDataContext.Provider>
  )
}

export const useEnergyData = () => useContext(EnergyDataContext) 