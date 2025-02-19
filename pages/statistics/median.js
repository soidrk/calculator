import { useState } from 'react';

export default function MedianCalculator() {
  const [numbers, setNumbers] = useState('');
  const [median, setMedian] = useState(null);

  const handleCalculate = () => {
    try {
      const numArray = numbers.split(',')
        .map(n => parseFloat(n.trim()))
        .filter(n => !isNaN(n));
      if (numArray.length === 0) {
        setMedian('Invalid input');
        return;
      }
      numArray.sort((a, b) => a - b);
      const mid = Math.floor(numArray.length / 2);
      const med = numArray.length % 2 === 0 
        ? (numArray[mid - 1] + numArray[mid]) / 2 
        : numArray[mid];
      setMedian(med);
    } catch (error) {
      setMedian('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Median Calculator</h2>
      <p>Enter numbers separated by commas:</p>
      <input 
        type="text" 
        value={numbers} 
        onChange={(e) => setNumbers(e.target.value)} 
        placeholder="e.g., 1, 2, 3, 4" 
      />
      <button onClick={handleCalculate}>Calculate Median</button>
      {median !== null && (
        <p>The median is: {median}</p>
      )}
    </div>
  );
}
