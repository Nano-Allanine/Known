import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as K } from 'react-router-dom'
import '@fontsource/poppins';

createRoot(document.getElementById('root')).render(
  <K>
  <StrictMode>
    <App />
  </StrictMode>
  </K>
)
