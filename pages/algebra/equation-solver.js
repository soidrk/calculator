import { useState } from 'react';
import { solveLinearEquations } from '../../utils/calculations';

export default function EquationSolver() {
  const [input, setInput] = useState(
    `2x + 3y = 7
x - y = 1`
  );
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);

  const handleSolve = () => {
    setError(null);
    try {
      // Split input into separate lines/equations
      const equations = input.split('\n').filter(line => line.trim() !== '');
      const sol = solveLinearEquations(equations);
      setSolution(sol);
    } catch (e) {
      setError(e.message);
      setSolution(null);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Linear Equation Solver</h2>
      <p>
        Enter one equation per line. Use standard notation (e.g., "2x + 3y = 7").
        The solver will attempt to solve for all variables.
      </p>
      <textarea
        rows={6}
        style={{ width: '100%' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSolve} style={{ marginTop: '1em' }}>
        Solve Equations
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {solution && (
        <div style={{ marginTop: '1em' }}>
          <h4>Solution:</h4>
          <pre>{JSON.stringify(solution, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
