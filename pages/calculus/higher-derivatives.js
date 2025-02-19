import { useState } from 'react';
import { nthDerivative } from '../../utils/calculations';

export default function HigherDerivatives() {
  const [expression, setExpression] = useState('');
  const [point, setPoint] = useState('');
  const [order, setOrder] = useState('2');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const val = nthDerivative(expression, point, parseInt(order, 10));
      setResult(val);
    } catch (error) {
      setResult('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Higher Derivatives Calculator</h2>
      <p>Numerically approximate the n-th derivative at a point:</p>
      <input 
        type="text" 
        value={expression} 
        onChange={(e) => setExpression(e.target.value)} 
        placeholder="e.g. x^3 + 2*x"
      />
      <input 
        type="number" 
        value={point} 
        onChange={(e) => setPoint(e.target.value)} 
        placeholder="Point x"
      />
      <input 
        type="number" 
        value={order} 
        onChange={(e) => setOrder(e.target.value)}
        placeholder="Derivative order (n)"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <p>The {order}-th derivative at x={point} is approximately {result}.</p>
      )}
    </div>
  );
}
