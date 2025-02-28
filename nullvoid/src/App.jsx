import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { EnergyDataProvider } from './context/EnergyDataContext'

function App() {
  return (
    <EnergyDataProvider>
      <BrowserRouter>
        <div className="app-container">
          <Sidebar />
          <MainContent />
        </div>
      </BrowserRouter>
    </EnergyDataProvider>
  )
}

export default App
