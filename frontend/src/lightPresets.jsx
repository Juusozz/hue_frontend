import axios from 'axios'

function Presets() {

    const presets = {
        Focus: { hue: 40000, sat: 50, bri: 254 },
        Warm: { hue: 8000, sat: 200, bri: 200 },
        Cool: { hue: 34000, sat: 150, bri: 254 },
        Energize: { hue: 47000, sat: 254, bri: 254 },
        Reading: { hue: 30000, sat: 50, bri: 200 },
        Sunset: { hue: 7000, sat: 230, bri: 150 },
        Night: { hue: 10000, sat: 200, bri: 50 }
    }

    const hsbToRgb = (hue, sat, bri) => {
        const h = hue / 65535; // Normalize hue (0–1)
        const s = sat / 254; // Normalize saturation (0–1)
        const v = bri / 254; // Normalize brightness (0–1)
    
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
    
        // Convert RGB values to the range 0–255
        return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }

    const LightPresets = () => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Light Presets</h2>
        <div>
            {Object.keys(presets).map((presetName) => {
            const preset = presets[presetName];
            const buttonColor = hsbToRgb(preset.hue, preset.sat, preset.bri); // Convert HSB to RGB
    
            return (
                <button
                key={presetName}
                onClick={() => applyPreset(presetName)}
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: buttonColor, 
                    color: 'black', 
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                >
                {presetName}
                </button>
            );
            })}
        </div>
        </div>
    )

    const applyPreset = async (presetName) => {
        const url = 'http://127.0.0.1:5000'
        const body = presets[presetName];
        try {
        const response = await axios.put(`${url}/colorswitch/trigger/api`, body)
        console.log(`Applied preset ${presetName}:`, response.data);
        } catch (error) {
        console.error(`Error applying preset ${presetName}:`, error);
        }
    }
    return (
        <div>
            <LightPresets />
        </div>
    )
}

export default Presets