// pages/matrices/lu-decomposition.js
import { useState } from "react";

// Simple Doolittle LU Decomposition without pivoting
function luDecomposition(A) {
  const n = A.length;
  // Initialize L as identity matrix and U as zero matrix
  const L = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
  const U = Array.from({ length: n }, () => Array(n).fill(0));
  let steps = [];

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[i][k] * U[k][j];
      }
      U[i][j] = A[i][j] - sum;
      steps.push(`U[${i}][${j}] = A[${i}][${j}] - Σ(L[${i}][k]*U[k][${j}]) = ${U[i][j].toFixed(4)}`);
    }
    for (let j = i + 1; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[j][k] * U[k][i];
      }
      L[j][i] = (A[j][i] - sum) / U[i][i];
      steps.push(`L[${j}][${i}] = (A[${j}][${i}] - Σ(L[${j}][k]*U[k][${i}])) / U[${i}][${i}] = ${L[j][i].toFixed(4)}`);
    }
  }
  return { L, U, steps };
}

export default function LUDecomposition() {
  const [matrixInput, setMatrixInput] = useState("4,3;6,3");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const parseMatrix = (str) => {
    return str.split(";").map(row => row.split(",").map(Number));
  };

  const handleCalculate = () => {
    try {
      const A = parseMatrix(matrixInput);
      const { L, U, steps } = luDecomposition(A);
      setResult({ L, U });
      setSteps(steps);
    } catch (error) {
      setResult(null);
      setSteps([]);
      alert("Error parsing matrix or during computation.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>LU Decomposition</h2>
      <p>
        Enter a square matrix (rows separated by semicolons, elements by commas). Example: "4,3;6,3"
      </p>
      <input
        type="text"
        value={matrixInput}
        onChange={(e) => setMatrixInput(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleCalculate} style={{ padding: "8px 16px" }}>Calculate LU</button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>L Matrix</h3>
          <pre>{JSON.stringify(result.L, null, 2)}</pre>
          <h3>U Matrix</h3>
          <pre>{JSON.stringify(result.U, null, 2)}</pre>
          <h3>Step-by-Step Explanation</h3>
          <ol>
            {steps.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}
