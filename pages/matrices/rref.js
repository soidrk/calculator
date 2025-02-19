import { useState } from 'react';
import { parseMatrix, matrixRREF } from '../../utils/calculations';

export default function RREFPage() {
  const [matrixStr, setMatrixStr] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const M = parseMatrix(matrixStr);
      const rref = matrixRREF(M);
      setResult(rref);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Row-Reduced Echelon Form (RREF)</h2>
      <p>Enter a matrix in row-semicolon format. Example: "1,2;3,4"</p>
      <textarea
        rows={3}
        cols={30}
        value={matrixStr}
        onChange={(e) => setMatrixStr(e.target.value)}
      />
      <br/>
      <button onClick={handleCalculate}>Compute RREF</button>

      {result && (
        <div style={{ marginTop: '1em' }}>
          <h4>RREF:</h4>
          <pre>{JSON.stringify(result)}</pre>
        </div>
      )}
    </div>
  );
}
