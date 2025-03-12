// pages/matrices/qr-decomposition.js
import { useState } from "react";

// Helper functions for vector operations
function dot(v1, v2) {
  return v1.reduce((acc, val, i) => acc + val * v2[i], 0);
}

function norm(v) {
  return Math.sqrt(dot(v, v));
}

function scalarMultiply(v, s) {
  return v.map(x => x * s);
}

function vectorSubtract(v1, v2) {
  return v1.map((x, i) => x - v2[i]);
}

function gramSchmidt(A) {
  // A is an m x n matrix (array of columns)
  const n = A[0].length;
  const m = A.length;
  let Q = Array.from({ length: m }, () => Array(n).fill(0));
  let R = Array.from({ length: n }, () => Array(n).fill(0));
  let steps = [];

  let aCols = [];
  // Convert A (given as 2D array with m rows) into array of column vectors
  for (let j = 0; j < n; j++) {
    let col = [];
    for (let i = 0; i < m; i++) {
      col.push(A[i][j]);
    }
    aCols.push(col);
  }

  let qCols = [];
  for (let j = 0; j < n; j++) {
    let v = aCols[j].slice();
    for (let i = 0; i < j; i++) {
      const projScalar = dot(aCols[j], qCols[i]);
      R[i][j] = projScalar;
      const proj = scalarMultiply(qCols[i], projScalar);
      v = vectorSubtract(v, proj);
      steps.push(`Projection of column ${j} onto Q[${i}]: ${proj.map(x => x.toFixed(4)).join(", ")}`);
    }
    const rjj = norm(v);
    R[j][j] = rjj;
    const qj = scalarMultiply(v, 1 / rjj);
    qCols.push(qj);
    steps.push(`Normalized Q[${j}]: ${qj.map(x => x.toFixed(4)).join(", ")}`);
  }
  // Convert Q back to m x n matrix (each column of Q becomes column in Q matrix)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      Q[i][j] = qCols[j][i];
    }
  }
  return { Q, R, steps };
}

export default function QRDecomposition() {
  const [matrixInput, setMatrixInput] = useState("1,1;1,2;1,3"); // 3x2 matrix example
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const parseMatrix = (str) => {
    return str.split(";").map(row => row.split(",").map(Number));
  };

  const handleCalculate = () => {
    try {
      const A = parseMatrix(matrixInput);
      const { Q, R, steps } = gramSchmidt(A);
      setResult({ Q, R });
      setSteps(steps);
    } catch (error) {
      setResult(null);
      setSteps([]);
      alert("Error parsing matrix or during computation.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>QR Decomposition (Gram‑Schmidt)</h2>
      <p>
        Enter a matrix (rows separated by semicolons, columns by commas). Example (3x2 matrix): "1,1;1,2;1,3"
      </p>
      <input
        type="text"
        value={matrixInput}
        onChange={(e) => setMatrixInput(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleCalculate} style={{ padding: "8px 16px" }}>Calculate QR</button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Q Matrix</h3>
          <pre>{JSON.stringify(result.Q, null, 2)}</pre>
          <h3>R Matrix</h3>
          <pre>{JSON.stringify(result.R, null, 2)}</pre>
          <h3>Step-by-Step Explanation</h3>
          <ol>
            {steps.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}
