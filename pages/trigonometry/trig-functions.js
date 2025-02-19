import { useState } from 'react';
import { evaluateAllTrigFunctions } from '../../utils/calculations';

export default function TrigFunctions() {
  const [angle, setAngle] = useState('');
  const [unit, setUnit] = useState('degrees');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    try {
      const res = evaluateAllTrigFunctions(angle, unit);
      setResults(res);
    } catch (error) {
      setResults('Invalid input');
    }
  };

  return (
    <div>
      <h2>All Trig Functions</h2>
      <p>Compute sin, cos, tan, csc, sec, and cot for a given angle.</p>
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
      <button onClick={handleCalculate}>Compute</button>
      {results && typeof results === 'object' && (
        <ul>
          <li>sin = {results.sin}</li>
          <li>cos = {results.cos}</li>
          <li>tan = {results.tan}</li>
          <li>csc = {results.csc}</li>
          <li>sec = {results.sec}</li>
          <li>cot = {results.cot}</li>
        </ul>
      )}
      {typeof results === 'string' && <p>{results}</p>}
    </div>
  );
}
