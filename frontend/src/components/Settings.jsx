import { useState, useEffect } from 'react'
import '../styles/Settings.css'

const Settings = () => {
  const [settings, setSettings] = useState({
    // General
    notifications: true,
    darkMode: false,
    language: 'en',
    autoSave: true,
    
    // Display
    fontSize: 'medium',
    theme: 'light',
    compactView: false,
    
    // Data & Privacy
    updateInterval: 30,
    unit: 'metric',
    shareAnalytics: true,
    backupData: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    notificationSound: 'default',
    
    // Advanced
    debugMode: false,
    experimentalFeatures: false
  })

  const [notification, setNotification] = useState({
    visible: false,
    message: '',
    isError: false
  })

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        showNotification('Error loading settings', true)
      }
    }
  }, [])

  const showNotification = (message, isError = false) => {
    setNotification({
      visible: true,
      message,
      isError
    })

    // Hide notification after 2 seconds
    setTimeout(() => {
      setNotification(prev => ({
        ...prev,
        visible: false
      }))
    }, 2000)
  }

  const handleSettingChange = (setting, value) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: value
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('userSettings', JSON.stringify(newSettings))
        showNotification('Settings saved')
      } catch (error) {
        showNotification('Error saving settings', true)
      }

      return newSettings
    })
  }

  return (
    <div className="settings">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Customize your experience by adjusting these settings</p>
        </div>

        <div className="settings-group">
          <h3>General</h3>
          <div className="setting-item">
            <label>
              Notifications
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
            </label>
            <div className="setting-description">Receive important updates and alerts</div>
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
            <div className="setting-description">Switch between light and dark themes</div>
          </div>
          <div className="setting-item">
            <label>
              Language
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </label>
          </div>
        </div>

        <div className="settings-group">
          <h3>Display</h3>
          <div className="setting-item">
            <label>
              Font Size
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label>
              Theme
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </label>
          </div>
        </div>

        <div className="settings-group">
          <h3>Data Settings</h3>
          <div className="setting-item">
            <label>
              Update Interval
              <select
                value={settings.updateInterval}
                onChange={(e) => handleSettingChange('updateInterval', Number(e.target.value))}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </label>
            <div className="setting-description">How often to fetch new data</div>
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
          <div className="setting-item">
            <label>
              Share Analytics
              <input
                type="checkbox"
                checked={settings.shareAnalytics}
                onChange={(e) => handleSettingChange('shareAnalytics', e.target.checked)}
              />
            </label>
            <div className="setting-description">Help us improve by sharing anonymous usage data</div>
          </div>
        </div>

        <div className="settings-group">
          <h3>Advanced</h3>
          <div className="setting-item">
            <label>
              Debug Mode
              <input
                type="checkbox"
                checked={settings.debugMode}
                onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
              />
            </label>
            <div className="setting-description">Enable detailed logging for troubleshooting</div>
          </div>
          <div className="setting-item">
            <label>
              Experimental Features
              <input
                type="checkbox"
                checked={settings.experimentalFeatures}
                onChange={(e) => handleSettingChange('experimentalFeatures', e.target.checked)}
              />
            </label>
            <div className="setting-description">Try out new features before they're released</div>
          </div>
        </div>

        {notification.visible && (
          <div className={`save-notification ${notification.isError ? 'error' : ''}`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings
