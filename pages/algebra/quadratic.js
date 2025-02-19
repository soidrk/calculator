import { useState } from 'react';

export default function QuadraticSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [roots, setRoots] = useState(null);

  const handleSolve = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);
    if (isNaN(A) || isNaN(B) || isNaN(C) || A === 0) {
      setRoots('Invalid input (a must not be 0)');
      return;
    }
    const discriminant = B * B - 4 * A * C;
    if (discriminant < 0) {
      setRoots('No real roots');
    } else {
      const root1 = (-B + Math.sqrt(discriminant)) / (2 * A);
      const root2 = (-B - Math.sqrt(discriminant)) / (2 * A);
      setRoots({ root1, root2 });
    }
  };

  return (
    <div>
      <h2>Quadratic Equation Solver</h2>
      <p>Solve ax² + bx + c = 0:</p>
      <input 
        type="number" 
        value={a} 
        onChange={(e) => setA(e.target.value)} 
        placeholder="Enter a" 
      />
      <input 
        type="number" 
        value={b} 
        onChange={(e) => setB(e.target.value)} 
        placeholder="Enter b" 
      />
      <input 
        type="number" 
        value={c} 
        onChange={(e) => setC(e.target.value)} 
        placeholder="Enter c" 
      />
      <button onClick={handleSolve}>Solve Equation</button>
      {roots && typeof roots === 'object' ? (
        <p>Roots: {roots.root1} and {roots.root2}</p>
      ) : (
        roots && <p>{roots}</p>
      )}
    </div>
  );
}
