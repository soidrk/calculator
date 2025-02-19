import { useState } from 'react';
import { rightTriangleSolve } from '../../utils/calculations';

export default function RightTriangle() {
  /*
    This calculator: Given any two pieces of info about a right triangle 
    (like angle in degrees, or side length),
    tries to solve for the other sides or angles.

    We'll keep it simple: 
    - input side a (opposite), 
    - side b (adjacent), 
    - side c (hypotenuse), 
    - angle A (opposite side a),
    - angle B (opposite side b).
    Fill in any two, it tries to solve the rest.
  */
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [A, setAngleA] = useState('');
  const [B, setAngleB] = useState('');
  const [result, setResult] = useState(null);

  const handleSolve = () => {
    try {
      const res = rightTriangleSolve({ a, b, c, A, B });
      setResult(res);
    } catch (error) {
      setResult('Invalid or insufficient data');
    }
  };

  return (
    <div>
      <h2>Right Triangle Solver</h2>
      <p>Enter any two known values (sides in numeric form, angles in degrees) and solve for the rest.</p>
      <div>
        <label>Side a (opposite angle A): </label>
        <input 
          type="number" 
          value={a} 
          onChange={(e) => setA(e.target.value)}
        />
      </div>
      <div>
        <label>Side b (opposite angle B): </label>
        <input 
          type="number" 
          value={b} 
          onChange={(e) => setB(e.target.value)}
        />
      </div>
      <div>
        <label>Side c (hypotenuse): </label>
        <input 
          type="number" 
          value={c} 
          onChange={(e) => setC(e.target.value)}
        />
      </div>
      <div>
        <label>Angle A (degrees): </label>
        <input 
          type="number" 
          value={A} 
          onChange={(e) => setAngleA(e.target.value)}
        />
      </div>
      <div>
        <label>Angle B (degrees): </label>
        <input 
          type="number" 
          value={B} 
          onChange={(e) => setAngleB(e.target.value)}
        />
      </div>
      <button onClick={handleSolve}>Solve</button>
      {result && typeof result === 'object' && (
        <div>
          <p>a = {result.a}</p>
          <p>b = {result.b}</p>
          <p>c = {result.c}</p>
          <p>Angle A = {result.A}°</p>
          <p>Angle B = {result.B}°</p>
        </div>
      )}
      {typeof result === 'string' && <p>{result}</p>}
    </div>
  );
}
