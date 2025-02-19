import { useState } from 'react';
import { derivative } from '../../utils/calculations';

export default function DerivativeCalculator() {
  const [expression, setExpression] = useState('');
  const [point, setPoint] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const deriv = derivative(expression, point);
      setResult(deriv);
    } catch (error) {
      setResult('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Derivative Calculator</h2>
      <p>
        Enter a function in terms of x (e.g., <code>x^2</code>) and a point to evaluate its derivative.
      </p>
      <input 
        type="text" 
        value={expression} 
        onChange={(e) => setExpression(e.target.value)} 
        placeholder="Enter function f(x)" 
      />
      <input 
        type="number" 
        value={point} 
        onChange={(e) => setPoint(e.target.value)} 
        placeholder="Enter point x" 
      />
      <button onClick={handleCalculate}>Calculate Derivative</button>
      {result !== null && (
        <p>The derivative at x = {point} is approximately {result}.</p>
      )}
    </div>
  );
}
