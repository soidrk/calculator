import { useState } from 'react';
import { approximateLimit } from '../../../utils/calculations';

export default function LimitAtPoint() {
  const [expression, setExpression] = useState('');
  const [point, setPoint] = useState('');
  const [direction, setDirection] = useState('both');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const val = approximateLimit(expression, point, direction);
      setResult(val);
    } catch (error) {
      setResult('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Limit at a Point</h2>
      <p>Approximate limit of f(x) as x → a.</p>
      <input 
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="f(x) e.g. x^2 - 4"
      />
      <input 
        type="number"
        value={point}
        onChange={(e) => setPoint(e.target.value)}
        placeholder="a"
      />
      <select value={direction} onChange={(e) => setDirection(e.target.value)}>
        <option value="both">Two-sided limit</option>
        <option value="left">Left-hand limit</option>
        <option value="right">Right-hand limit</option>
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <p>Limit = {result}</p>
      )}
    </div>
  );
}
