import { useState } from 'react';
import { approximateLimitInfinity } from '../../../utils/calculations';

export default function LimitAtInfinity() {
  const [expression, setExpression] = useState('');
  const [sign, setSign] = useState('1');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const val = approximateLimitInfinity(expression, parseInt(sign, 10));
      setResult(val);
    } catch (error) {
      setResult('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Limit at Infinity</h2>
      <p>Approximate limit of f(x) as x → ±∞.</p>
      <input 
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="f(x) e.g. (3*x^2 + 2) / x^2"
      />
      <select value={sign} onChange={(e) => setSign(e.target.value)}>
        <option value="1">x → +∞</option>
        <option value="-1">x → -∞</option>
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <p>Limit = {result}</p>
      )}
    </div>
  );
}
