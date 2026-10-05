import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AppProvider, PrefsProvider } from './store/AppStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrefsProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </PrefsProvider>
    </BrowserRouter>
  </StrictMode>,
)
