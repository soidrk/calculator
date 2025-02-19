import { useState } from 'react';
import { approximateLimit } from '../../../utils/calculations';

export default function PiecewiseLimit() {
  const [piece1, setPiece1] = useState('x^2');
  const [piece2, setPiece2] = useState('2*x + 1');
  const [boundary, setBoundary] = useState('0');
  const [side, setSide] = useState('left');
  const [result, setResult] = useState(null);

  // This is a simple demonstration:
  //   If x < boundary, f(x) = piece1
  //   If x >= boundary, f(x) = piece2
  // We'll just approximate limit from left or right using the chosen piece.

  const handleCalculate = () => {
    try {
      const b = parseFloat(boundary);
      let expression = side === 'left' ? piece1 : piece2;
      const val = approximateLimit(expression, b, side === 'left' ? 'right' : 'left');
      setResult(val);
    } catch (error) {
      setResult('Error in calculation');
    }
  };

  return (
    <div>
      <h2>Piecewise Function Limit</h2>
      <p>
        Suppose f(x) = {`{`} piece1 if x &lt; boundary, piece2 otherwise {`}`}.
        Approximate the limit at the boundary from one side.
      </p>
      <label>
        Piece 1 (x &lt; boundary):
        <input 
          type="text"
          value={piece1}
          onChange={(e) => setPiece1(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Piece 2 (x ≥ boundary):
        <input 
          type="text"
          value={piece2}
          onChange={(e) => setPiece2(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Boundary:
        <input 
          type="number"
          value={boundary}
          onChange={(e) => setBoundary(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Side:
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="left">Approach from left side of boundary</option>
          <option value="right">Approach from right side of boundary</option>
        </select>
      </label>
      <br/>
      <button onClick={handleCalculate}>Calculate Limit</button>
      {result !== null && (
        <p>Limit = {result}</p>
      )}
    </div>
  );
}
