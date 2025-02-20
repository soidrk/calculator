import { useState } from 'react';
import { solveLinearEquations } from '../../utils/calculations';

export default function EquationSolver() {
  const [input, setInput] = useState('');
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);

  const handleSolve = () => {
    setError(null);
    try {
      const equations = input
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      if (equations.length === 0) {
        throw new Error('Please enter at least one equation');
      }
      const sol = solveLinearEquations(equations);
      setSolution(sol);
    } catch (e) {
      setError(e.message);
      setSolution(null);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>Linear Equation Solver</h2>
      <p>
        Enter each equation on its own line, e.g.<br />
        <code>2x + 3y = 7</code><br />
        <code>x - y = 1</code>
      </p>
      <textarea
        rows={6}
        style={{ width: '100%', fontFamily: 'monospace', padding: '5px' }}
        placeholder="2x + 3y = 7&#10;x - y = 1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSolve} style={{ marginTop: '10px', padding: '5px 10px' }}>
        Solve
      </button>
      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
        </p>
      )}
      {solution && (
        <div style={{ marginTop: '10px' }}>
          <h4>Solution:</h4>
          <pre style={{ background: '#f9f9f9', padding: '10px' }}>
            {JSON.stringify(solution, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
