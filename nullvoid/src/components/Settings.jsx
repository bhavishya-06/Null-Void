import { useState } from 'react'
import '../styles/Settings.css'

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    updateInterval: 30,
    unit: 'metric'
  })

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings-container">
        <div className="settings-group">
          <h3>General Settings</h3>
          <div className="setting-item">
            <label>
              Notifications
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              Dark Mode
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="settings-group">
          <h3>Data Settings</h3>
          <div className="setting-item">
            <label>
              Update Interval (minutes)
              <select
                value={settings.updateInterval}
                onChange={(e) => handleSettingChange('updateInterval', Number(e.target.value))}
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label>
              Unit System
              <select
                value={settings.unit}
                onChange={(e) => handleSettingChange('unit', e.target.value)}
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
