import { useState } from 'react';

export default function BasicArithmetic() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      // Note: using eval() is for demonstration only.
      const res = eval(expression);
      setResult(res);
    } catch (error) {
      setResult('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Basic Arithmetic Calculator</h2>
      <p>Enter an arithmetic expression (e.g., 2+2*3):</p>
      <input 
        type="text" 
        value={expression} 
        onChange={(e) => setExpression(e.target.value)} 
        placeholder="Enter expression" 
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <p>Result: {result}</p>
      )}
    </div>
  );
}
