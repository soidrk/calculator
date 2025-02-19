import { useState } from 'react';

export default function VolumeCalculator() {
  const [radius, setRadius] = useState('');
  const [volume, setVolume] = useState(null);

  const handleCalculate = () => {
    const r = parseFloat(radius);
    if (isNaN(r)) {
      setVolume('Invalid input');
      return;
    }
    const calculatedVolume = (4/3) * Math.PI * Math.pow(r, 3);
    setVolume(calculatedVolume);
  };

  return (
    <div>
      <h2>Volume Calculator</h2>
      <p>Calculate the volume of a sphere given its radius:</p>
      <input 
        type="number" 
        value={radius} 
        onChange={(e) => setRadius(e.target.value)} 
        placeholder="Enter radius" 
      />
      <button onClick={handleCalculate}>Calculate Volume</button>
      {volume !== null && (
        <p>The volume of the sphere is: {typeof volume === 'number' ? volume.toFixed(2) : volume}</p>
      )}
    </div>
  );
}
