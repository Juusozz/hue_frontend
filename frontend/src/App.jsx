import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const url = 'http://127.0.0.1:5000'
  const [stateOfLight, setStateOfLight] = useState('')

  const switchLight = async () => {
    try {
      const response = await axios.put(`${url}/lightswitch/trigger/api`)
    console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    getLightState()
  }
  const getLightState = async () => {
    try {
      const response = await axios.get(`${url}/getlightinfo/trigger/api`)
      const lightState = response.data?.state?.on;
      if (lightState === true) {
        setStateOfLight('On')
      } else {
        setStateOfLight('Off')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getLightState()
  }, [])

  const textClass = stateOfLight === 'On' ? 'text-on' : 'text-off'
  const displayText = stateOfLight === 'On' ? '💡 On' : '⛔ Off';

  return (
    <div>
      <p>The light is {''} <span className = {textClass}>{displayText}</span></p>
      <button onClick = {switchLight}>Turn On or Off</button>
    </div>
  )
}

export default App
