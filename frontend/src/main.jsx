import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HueSliders from './colorSlider.jsx'
import LightPresets from './lightPresets.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <HueSliders />
    <LightPresets />
  </StrictMode>,
)
