import { useState } from 'react';
import { convertLength } from '../../utils/calculations';

export default function LengthConversion() {
  const [meters, setMeters] = useState('');
  const [kilometers, setKilometers] = useState(null);

  const handleConvert = () => {
    try {
      const km = convertLength(meters);
      setKilometers(km);
    } catch (error) {
      setKilometers('Invalid input');
    }
  };

  return (
    <div>
      <h2>Length Conversion</h2>
      <p>Convert meters to kilometers:</p>
      <input 
        type="number" 
        value={meters} 
        onChange={(e) => setMeters(e.target.value)} 
        placeholder="Enter meters" 
      />
      <button onClick={handleConvert}>Convert</button>
      {kilometers !== null && (
        <p>{meters} meters = {kilometers} kilometers.</p>
      )}
    </div>
  );
}
