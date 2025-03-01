import React, { useState } from 'react';
import '../styles/APIIntegration.css';

const APIIntegration = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [apiKey, setApiKey] = useState('');
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);

  const generateApiKey = () => {
    // Generate a random API key with a format like: xxxx-xxxx-xxxx-xxxx
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const segments = 4;
    const segmentLength = 4;
    
    const generateSegment = () => {
      let segment = '';
      for (let i = 0; i < segmentLength; i++) {
        segment += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return segment;
    };

    const newApiKey = Array(segments).fill(null).map(generateSegment).join('-');
    setApiKey(newApiKey);
    setIsKeyGenerated(true);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/forecasts',
      description: 'Retrieve energy consumption forecasts for a specific location',
      parameters: [
        { name: 'location_id', type: 'string', required: true, description: 'The ID of the location' },
        { name: 'start_date', type: 'string', required: true, description: 'Start date in ISO format' },
        { name: 'end_date', type: 'string', required: true, description: 'End date in ISO format' },
        { name: 'interval', type: 'string', required: false, description: 'Data interval (hourly/daily/weekly)' },
        { name: 'forecast_type', type: 'string', required: false, description: 'Type of forecast (consumption/production/demand)' }
      ]
    },
    {
      method: 'GET',
      path: '/api/v1/locations',
      description: 'List all registered energy facility locations',
      parameters: [
        { name: 'facility_type', type: 'string', required: false, description: 'Filter by facility type (solar/wind/grid)' },
        { name: 'region', type: 'string', required: false, description: 'Filter by geographical region' }
      ]
    },
    {
      method: 'POST',
      path: '/api/v1/webhooks',
      description: 'Set up real-time forecast notifications via webhooks',
      parameters: [
        { name: 'callback_url', type: 'string', required: true, description: 'URL to receive webhook notifications' },
        { name: 'events', type: 'array', required: true, description: 'Array of events to subscribe to (forecast_update/threshold_alert)' }
      ]
    },
    {
      method: 'GET',
      path: '/api/v1/metrics',
      description: 'Retrieve historical accuracy metrics for forecasts',
      parameters: [
        { name: 'location_id', type: 'string', required: true, description: 'The ID of the location' },
        { name: 'metric_type', type: 'string', required: false, description: 'Type of metric (mape/rmse/mae)' }
      ]
    }
  ];

  const renderCodeExample = (endpoint) => {
    let example = `curl -X ${endpoint.method} \\
  https://api.energyforecast.com${endpoint.path}`;
    
    if (endpoint.method === 'POST') {
      example += ` \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    ${endpoint.parameters.map(p => `"${p.name}": "${p.name === 'events' ? '["forecast_update"]' : 'example_value'}"`).join(',\n    ')}
  }'`;
    } else {
      example += ` \\
  -H "Authorization: Bearer YOUR_API_KEY"`;
    }
    
    return example;
  };

  return (
    <div className="api-integration">
      <h1>API Integration for Energy Management Systems</h1>
      
      <div className="api-navigation">
        <button 
          className={activeSection === 'overview' ? 'active' : ''} 
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </button>
        <button 
          className={activeSection === 'authentication' ? 'active' : ''} 
          onClick={() => setActiveSection('authentication')}
        >
          Authentication
        </button>
        <button 
          className={activeSection === 'endpoints' ? 'active' : ''} 
          onClick={() => setActiveSection('endpoints')}
        >
          Endpoints
        </button>
        <button 
          className={activeSection === 'integration' ? 'active' : ''} 
          onClick={() => setActiveSection('integration')}
        >
          Integration Guide
        </button>
      </div>

      <div className="api-content">
        {activeSection === 'overview' && (
          <div className="overview-section">
            <h2>Overview</h2>
            <p>Our API enables seamless integration of energy consumption forecasts into your existing energy management systems. 
               Built with REST principles, it provides secure and reliable access to our advanced forecasting capabilities.</p>
            <h3>Features</h3>
            <ul>
              <li>Real-time forecast data access with sub-hourly updates</li>
              <li>Historical consumption patterns and trend analysis</li>
              <li>Multi-location support for distributed energy facilities</li>
              <li>Webhook notifications for forecast updates and threshold alerts</li>
              <li>Comprehensive accuracy metrics and validation tools</li>
              <li>Support for various energy facility types (solar, wind, grid)</li>
              <li>Flexible data formats and integration options</li>
            </ul>
          </div>
        )}

        {activeSection === 'authentication' && (
          <div className="authentication-section">
            <h2>Authentication</h2>
            <p>All API requests require authentication using an API key in the Authorization header. Your API key provides secure access to your organization's data and forecasts.</p>
            <div className="api-key-demo">
              <h3>Your API Key</h3>
              <div className="api-key-display">
                {isKeyGenerated ? (
                  <div className="generated-key">
                    <code>{apiKey}</code>
                    <button 
                      className="copy-button"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        alert('API Key copied to clipboard!');
                      }}
                    >
                      Copy
                    </button>
                  </div>
                ) : (
                  <p className="no-key-message">No API key generated yet. Click the button below to generate one.</p>
                )}
                <button 
                  className="generate-button" 
                  onClick={generateApiKey}
                >
                  {isKeyGenerated ? 'Generate New Key' : 'Generate API Key'}
                </button>
              </div>
              <div className="api-key-example">
                <h4>Example Request Header:</h4>
                <pre>
                  <code>
                    Authorization: Bearer {isKeyGenerated ? apiKey : 'YOUR_API_KEY'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'endpoints' && (
          <div className="endpoints-section">
            <h2>API Endpoints</h2>
            {endpoints.map((endpoint, index) => (
              <div key={index} className="endpoint-card">
                <div className="endpoint-header">
                  <span className={`method ${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
                  <span className="path">{endpoint.path}</span>
                </div>
                <p>{endpoint.description}</p>
                {endpoint.parameters.length > 0 && (
                  <div className="parameters">
                    <h4>Parameters:</h4>
                    <ul>
                      {endpoint.parameters.map((param, pIndex) => (
                        <li key={pIndex}>
                          <code>{param.name}</code> ({param.type})
                          {param.required && <span className="required">required</span>}
                          <p>{param.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="code-example">
                  <h4>Example Request:</h4>
                  <pre>
                    <code>{renderCodeExample(endpoint)}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'integration' && (
          <div className="integration-guide">
            <h2>Integration Guide</h2>
            <div className="integration-steps">
              <h3>Getting Started</h3>
              <ol>
                <li>
                  <h4>Request API Access</h4>
                  <p>Contact our support team to get your API credentials and discuss your integration needs.</p>
                </li>
                <li>
                  <h4>Choose Integration Method</h4>
                  <p>Select between REST API calls or webhook notifications based on your real-time requirements.</p>
                </li>
                <li>
                  <h4>Test in Sandbox</h4>
                  <p>Use our sandbox environment to test your integration without affecting production data.</p>
                </li>
                <li>
                  <h4>Monitor & Scale</h4>
                  <p>Use our metrics endpoint to monitor forecast accuracy and scale your integration as needed.</p>
                </li>
              </ol>
              <h3>Best Practices</h3>
              <ul>
                <li>Implement proper error handling and retry mechanisms</li>
                <li>Cache forecast data appropriately to optimize performance</li>
                <li>Set up monitoring for webhook endpoint availability</li>
                <li>Regular validation of forecast accuracy metrics</li>
              </ul>
              <h3>Sample Integration Code</h3>
              <div className="code-samples">
                <h4>Python Example:</h4>
                <pre>
                  <code>{`import requests

API_KEY = 'your_api_key'
BASE_URL = 'https://api.energyforecast.com'

def get_forecast(location_id, start_date, end_date):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(
        f'{BASE_URL}/api/v1/forecasts',
        headers=headers,
        params={
            'location_id': location_id,
            'start_date': start_date,
            'end_date': end_date,
            'interval': 'hourly'
        }
    )
    
    return response.json()`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default APIIntegration; 