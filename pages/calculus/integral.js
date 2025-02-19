import { useState } from 'react';
import { evaluate } from 'mathjs';

export default function IntegralCalculator() {
  const [expression, setExpression] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const lower = parseFloat(a);
    const upper = parseFloat(b);
    if (isNaN(lower) || isNaN(upper)) {
      setResult('Invalid interval');
      return;
    }
    const n = 1000; // subdivisions
    const h = (upper - lower) / n;
    let sum = 0;
    try {
      for (let i = 0; i <= n; i++) {
        const x = lower + i * h;
        const fx = evaluate(expression, { x });
        sum += i === 0 || i === n ? fx : 2 * fx;
      }
      const integral = (h / 2) * sum;
      setResult(integral);
    } catch (error) {
      setResult('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Integral Calculator</h2>
      <p>Enter a function in terms of x and the limits of integration:</p>
      <input 
        type="text" 
        value={expression} 
        onChange={(e) => setExpression(e.target.value)} 
        placeholder="Enter function f(x)" 
      />
      <input 
        type="number" 
        value={a} 
        onChange={(e) => setA(e.target.value)} 
        placeholder="Lower limit (a)" 
      />
      <input 
        type="number" 
        value={b} 
        onChange={(e) => setB(e.target.value)} 
        placeholder="Upper limit (b)" 
      />
      <button onClick={handleCalculate}>Calculate Integral</button>
      {result !== null && (
        <p>The integral from {a} to {b} is approximately {result}.</p>
      )}
    </div>
  );
}
