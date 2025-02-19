import { useState } from 'react';
import { parseMatrix, matrixEigen } from '../../utils/calculations';

export default function EigenPage() {
  const [matrixStr, setMatrixStr] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const M = parseMatrix(matrixStr);
      const eig = matrixEigen(M);
      setResult(eig);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Eigenvalues &amp; Eigenvectors</h2>
      <p>Enter a 2x2 or 3x3 matrix in row-semicolon format. Example (2x2): "2,1;1,2"</p>
      <textarea
        rows={3}
        cols={30}
        value={matrixStr}
        onChange={(e) => setMatrixStr(e.target.value)}
      />
      <br/>
      <button onClick={handleCalculate}>Compute Eigen</button>

      {result && typeof result === 'object' && (
        <div style={{ marginTop: '1em' }}>
          <h4>Eigenvalues:</h4>
          <pre>{JSON.stringify(result.values)}</pre>
          <h4>Eigenvectors (approx.):</h4>
          <pre>{JSON.stringify(result.vectors)}</pre>
        </div>
      )}
      {typeof result === 'string' && <p>{result}</p>}
    </div>
  );
}
