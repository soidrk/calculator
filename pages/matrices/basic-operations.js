import { useState } from 'react';
import { 
  parseMatrix, 
  matrixAdd, 
  matrixSubtract, 
  matrixMultiply, 
  matrixTranspose 
} from '../../utils/calculations';

export default function BasicOperations() {
  const [matrixA, setMatrixA] = useState('');
  const [matrixB, setMatrixB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const A = parseMatrix(matrixA);
      const B = parseMatrix(matrixB);

      let output;
      switch (operation) {
        case 'add':
          output = matrixAdd(A, B);
          break;
        case 'subtract':
          output = matrixSubtract(A, B);
          break;
        case 'multiply':
          output = matrixMultiply(A, B);
          break;
        case 'transposeA':
          output = matrixTranspose(A);
          break;
        case 'transposeB':
          output = matrixTranspose(B);
          break;
        default:
          output = 'Unknown operation';
      }

      setResult(output);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Matrix Basic Operations</h2>
      <p>Enter two matrices in row-semicolon format. Example for a 2x2 matrix: "1,2;3,4"</p>

      <div style={{ marginBottom: '1em' }}>
        <label>Matrix A:</label><br />
        <textarea 
          rows={3} 
          cols={30}
          value={matrixA} 
          onChange={(e) => setMatrixA(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1em' }}>
        <label>Matrix B:</label><br />
        <textarea 
          rows={3} 
          cols={30}
          value={matrixB} 
          onChange={(e) => setMatrixB(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1em' }}>
        <label>Operation:</label><br />
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">A + B</option>
          <option value="subtract">A - B</option>
          <option value="multiply">A * B</option>
          <option value="transposeA">Transpose(A)</option>
          <option value="transposeB">Transpose(B)</option>
        </select>
      </div>

      <button onClick={handleCalculate}>Compute</button>

      {result && (
        <div style={{ marginTop: '1em' }}>
          <h4>Result:</h4>
          <pre>{Array.isArray(result) ? JSON.stringify(result) : String(result)}</pre>
        </div>
      )}
    </div>
  );
}
