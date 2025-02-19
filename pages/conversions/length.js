import { useState } from 'react';
import { percentageCalculator } from '../../utils/calculations';

export default function PercentageCalculator() {
  const [part, setPart] = useState('');
  const [whole, setWhole] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const percentage = percentageCalculator(part, whole);
      setResult(percentage);
    } catch (error) {
      setResult('Invalid input');
    }
  };

  return (
    <div>
      <h2>Percentage Calculator</h2>
      <p>Calculate what percentage the part is of the whole:</p>
      <input 
        type="number" 
        value={part} 
        onChange={(e) => setPart(e.target.value)} 
        placeholder="Enter part" 
      />
      <input 
        type="number" 
        value={whole} 
        onChange={(e) => setWhole(e.target.value)} 
        placeholder="Enter whole" 
      />
      <button onClick={handleCalculate}>Calculate Percentage</button>
      {result !== null && (
        <p>{part} is {typeof result === 'number' ? result.toFixed(2) : result}% of {whole}.</p>
      )}
    </div>
  );
}
