import { useState } from 'react';

export default function SineCalculator() {
  const [angle, setAngle] = useState('');
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState('degrees');

  const handleCalculate = () => {
    let angleInRadians = parseFloat(angle);
    if (isNaN(angleInRadians)) {
      setResult('Invalid input');
      return;
    }
    if (unit === 'degrees') {
      angleInRadians = angleInRadians * Math.PI / 180;
    }
    setResult(Math.sin(angleInRadians));
  };

  return (
    <div>
      <h2>Sine Calculator</h2>
      <p>Calculate sine of an angle:</p>
      <input 
        type="number" 
        value={angle} 
        onChange={(e) => setAngle(e.target.value)} 
        placeholder="Enter angle" 
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="degrees">Degrees</option>
        <option value="radians">Radians</option>
      </select>
      <button onClick={handleCalculate}>Calculate Sine</button>
      {result !== null && (
        <p>Sine of {angle} {unit} is: {result}</p>
      )}
    </div>
  );
}
