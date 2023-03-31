import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { SidebarProvider } from './contexts/SidebarContext';
import 'normalize.css'
import './dashboard.css'
// import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </Router>
  </React.StrictMode>,
)
