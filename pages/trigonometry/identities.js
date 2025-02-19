import { useState } from 'react';
import { simplifyTrigExpression } from '../../utils/calculations';

export default function Identities() {
  const [expression, setExpression] = useState('');
  const [simplified, setSimplified] = useState('');

  const handleSimplify = () => {
    try {
      const s = simplifyTrigExpression(expression);
      setSimplified(s);
    } catch (error) {
      setSimplified('Invalid input');
    }
  };

  return (
    <div>
      <h2>Trigonometric Identities / Simplifier</h2>
      <p>Enter a trig expression (e.g. "sin(x)^2 + cos(x)^2"):</p>
      <input 
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder='e.g. "sin(x)^2 + cos(x)^2"'
      />
      <button onClick={handleSimplify}>Simplify</button>
      {simplified && (
        <p>Simplified: {simplified}</p>
      )}

      <h3>Common Trig Identities:</h3>
      <ul>
        <li>sin²x + cos²x = 1</li>
        <li>1 + tan²x = sec²x</li>
        <li>1 + cot²x = csc²x</li>
        <li>sin(2x) = 2 sin(x) cos(x)</li>
        <li>cos(2x) = cos²x - sin²x = 2cos²x - 1 = 1 - 2sin²x</li>
        <li>tan(2x) = 2 tan(x) / [1 - tan²x]</li>
        {/* Add as many as you'd like */}
      </ul>
    </div>
  );
}
