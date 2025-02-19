import { useState } from 'react';
import { parseMatrix, matrixDeterminant } from '../../utils/calculations';

export default function DeterminantPage() {
  const [matrixStr, setMatrixStr] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const M = parseMatrix(matrixStr);
      const det = matrixDeterminant(M);
      setResult(det);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Matrix Determinant</h2>
      <p>Enter a square matrix in row-semicolon format. Example: "1,2;3,4"</p>
      <textarea 
        rows={3} 
        cols={30}
        value={matrixStr} 
        onChange={(e) => setMatrixStr(e.target.value)}
      />
      <br/>
      <button onClick={handleCalculate}>Compute Determinant</button>

      {result !== null && (
        <div style={{ marginTop: '1em' }}>
          <h4>Determinant:</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
