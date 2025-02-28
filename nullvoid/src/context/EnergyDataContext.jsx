import { createContext, useContext, useState, useEffect } from 'react'

const EnergyDataContext = createContext()

export const EnergyDataProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)

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
        loading 
      }}
    >
      {children}
    </EnergyDataContext.Provider>
  )
}

export const useEnergyData = () => useContext(EnergyDataContext) 