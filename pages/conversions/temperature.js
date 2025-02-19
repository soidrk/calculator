import { useState } from 'react';

export default function TemperatureConversion() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState(null);

  const handleConvert = () => {
    const c = parseFloat(celsius);
    if (!isNaN(c)) {
      setFahrenheit((c * 9/5) + 32);
    } else {
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
        <p>{celsius}°C is equal to {fahrenheit}°F.</p>
      )}
    </div>
  );
}
