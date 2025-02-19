import { useState } from 'react';
import { convertTemperature } from '../../utils/calculations';

export default function TemperatureConversion() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState(null);

  const handleConvert = () => {
    try {
      const f = convertTemperature(celsius);
      setFahrenheit(f);
    } catch (error) {
      setFahrenheit('Invalid input');
    }
  };

  return (
    <div>
      <h2>Temperature Conversion</h2>
      <p>Convert Celsius to Fahrenheit:</p>
      <input 
        type="number" 
        value={celsius} 
        onChange={(e) => setCelsius(e.target.value)} 
        placeholder="Enter Celsius" 
      />
      <button onClick={handleConvert}>Convert</button>
      {fahrenheit !== null && (
        <p>{celsius} °C = {fahrenheit} °F.</p>
      )}
    </div>
  );
}
