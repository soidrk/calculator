import { useState } from 'react';

export default function AreaCalculator() {
  const [radius, setRadius] = useState('');
  const [area, setArea] = useState(null);

  const handleCalculate = () => {
    const r = parseFloat(radius);
    if (isNaN(r)) {
      setArea('Invalid input');
      return;
    }
    const calculatedArea = Math.PI * r * r;
    setArea(calculatedArea);
  };

  return (
    <div>
      <h2>Area Calculator</h2>
      <p>Calculate the area of a circle given its radius:</p>
      <input 
        type="number" 
        value={radius} 
        onChange={(e) => setRadius(e.target.value)} 
        placeholder="Enter radius" 
      />
      <button onClick={handleCalculate}>Calculate Area</button>
      {area !== null && (
        <p>The area of the circle is: {typeof area === 'number' ? area.toFixed(2) : area}</p>
      )}
    </div>
  );
}
