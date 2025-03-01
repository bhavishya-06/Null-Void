import { useState, useEffect } from 'react'
import { useEnergyData } from '../../context/EnergyDataContext'
import '../../styles/dashboard/EnergyOverview.css'

const EnergyOverview = () => {
  const { selectedLocation } = useEnergyData()
  const [overview, setOverview] = useState({
    solarPercentage: 0,
    windPercentage: 0,
    totalGeneration: 0
  })

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ml/predict?location=${encodeURIComponent(selectedLocation || 'Delhi')}`);
        const data = await response.json();
        if (data.success && data.predictions) {
          const totalSolar = data.predictions.reduce((sum, p) => sum + p.solar, 0);
          const totalWind = data.predictions.reduce((sum, p) => sum + p.wind, 0);
          const total = totalSolar + totalWind;
          
          setOverview({
            solarPercentage: Math.round((totalSolar / total) * 100) || 0,
            windPercentage: Math.round((totalWind / total) * 100) || 0,
            totalGeneration: Math.round(total / 1000) // Convert to MWh
          });
        }
      } catch (err) {
        console.error('Error fetching overview data:', err);
      }
    };

    fetchOverview();
  }, [selectedLocation]);

  return (
    <div className="energy-overview card">
      <h3>Energy Generation Mix</h3>
      <div className="mix-container">
        <div className="mix-item">
          <div className="mix-icon solar"></div>
          <div className="mix-details">
            <span className="label">Solar</span>
            <span className="percentage">{overview.solarPercentage}%</span>
          </div>
        </div>
        <div className="mix-item">
          <div className="mix-icon wind"></div>
          <div className="mix-details">
            <span className="label">Wind</span>
            <span className="percentage">{overview.windPercentage}%</span>
          </div>
        </div>
      </div>
      <div className="total-generation">
        <span className="label">Total Generation</span>
        <span className="value">{overview.totalGeneration} MWh</span>
      </div>
    </div>
  )
}

export default EnergyOverview 