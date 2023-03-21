import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-114ylhztictuc35u.eu.auth0.com"
      clientId="C1LUd5GgB7TPtsRQWc7Faf9afGk7PZtj"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`
      }}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
)
