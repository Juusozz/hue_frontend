import { useState } from 'react';
import axios from 'axios'

function HueSliders() {
  const [hue, setHue] = useState(32767)
  const [saturation, setSaturation] = useState(127)
  const [brightness, setBrightness] = useState(127)


  const computeColor = () => {
    const h = hue / 65535;
    const s = saturation / 254;
    const v = brightness / 254;
    
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: (r = v), (g = t), (b = p); break;
      case 1: (r = q), (g = v), (b = p); break;
      case 2: (r = p), (g = v), (b = t); break;
      case 3: (r = p), (g = q), (b = v); break;
      case 4: (r = t), (g = p), (b = v); break;
      case 5: (r = v), (g = p), (b = q); break;
      default: (r = 0), (g = 0), (b = 0);
    }

    // Convert to RGB 0–255 range
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  };

  const colorPreview = computeColor();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Color Sliders</h2>
      
      {/* Color Preview */}
      <div
        style={{
          width: '200px',
          height: '100px',
          margin: '20px auto',
          backgroundColor: colorPreview,
          border: '1px solid #ccc',
        }}
      ></div>

      {/* Hue Slider */}
      <div>
        <label>
          Hue: {hue}
        </label>
        <input
          type="range"
          min="0"
          max="65535"
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
        />
      </div>

      {/* Saturation Slider */}
      <div>
        <label>
          Saturation: {saturation}
        </label>
        <input
          type="range"
          min="0"
          max="254"
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
        />
      </div>

      {/* Brightness Slider */}
      <div>
        <label>
          Brightness: {brightness}
        </label>
        <input
          type="range"
          min="0"
          max="254"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />
      </div>

      {/* Submit Button to Send Data to Philips Hue Bridge */}
      <button
        onClick={() => {
            sendColorToBridge(hue, saturation, brightness);
        }}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Send to Hue Bridge
      </button>
      
    </div>
  );
}

// Function to Send Data to Philips Hue Bridge
const sendColorToBridge = async (hue, saturation, brightness) => {
  const url = 'http://127.0.0.1:5000'

  const body = {
    hue: hue,
    sat: saturation,
    bri: brightness,
  };

  try {
    const response = await axios.put(`${url}/colorswitch/trigger/api`, body)
    console.log('Success: ', response.json)
  } catch (error) {
    console.error('Error sending to Philips Hue Bridge:', error)
  }
};

export default HueSliders;