import { useState } from 'react';
import { parseMatrix, matrixInverse } from '../../utils/calculations';

export default function InversePage() {
  const [matrixStr, setMatrixStr] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const M = parseMatrix(matrixStr);
      const inv = matrixInverse(M);
      setResult(inv);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Matrix Inverse</h2>
      <p>Enter a square, invertible matrix in row-semicolon format. Example: "1,2;3,4"</p>
      <textarea
        rows={3}
        cols={30}
        value={matrixStr}
        onChange={(e) => setMatrixStr(e.target.value)}
      />
      <br/>
      <button onClick={handleCalculate}>Compute Inverse</button>

      {result && (
        <div style={{ marginTop: '1em' }}>
          <h4>Inverse:</h4>
          <pre>{JSON.stringify(result)}</pre>
        </div>
      )}
    </div>
  );
}
