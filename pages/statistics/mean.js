import { useState } from 'react';

export default function MeanCalculator() {
  const [numbers, setNumbers] = useState('');
  const [mean, setMean] = useState(null);

  const handleCalculate = () => {
    try {
      const numArray = numbers.split(',')
        .map(n => parseFloat(n.trim()))
        .filter(n => !isNaN(n));
      if (numArray.length === 0) {
        setMean('Invalid input');
        return;
      }
      const total = numArray.reduce((acc, curr) => acc + curr, 0);
      setMean(total / numArray.length);
    } catch (error) {
      setMean('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Mean Calculator</h2>
      <p>Enter numbers separated by commas:</p>
      <input 
        type="text" 
        value={numbers} 
        onChange={(e) => setNumbers(e.target.value)} 
        placeholder="e.g., 1, 2, 3, 4" 
      />
      <button onClick={handleCalculate}>Calculate Mean</button>
      {mean !== null && (
        <p>The mean is: {mean}</p>
      )}
    </div>
  );
}
