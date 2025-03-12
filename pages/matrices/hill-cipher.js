// pages/matrices/hill-cipher.js
import { useState } from "react";
import { matrix, multiply } from "mathjs";

// Helper: parse a matrix from string "3,3;2,5"
function parseMatrix(str) {
  return str.split(";").map(row => row.split(",").map(Number));
}

// Helper: compute modular inverse of an integer mod m
function modInverse(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

// Helper: compute matrix inverse mod 26 (for 2x2 matrices for simplicity)
function matrixInverseMod26(M) {
  if (M.length !== 2 || M[0].length !== 2) {
    throw new Error("Only 2x2 matrices supported for Hill cipher.");
  }
  const [[a, b], [c, d]] = M;
  const det = a * d - b * c;
  const detInv = modInverse(det, 26);
  if (detInv === null) throw new Error("Matrix not invertible mod 26.");
  return [
    [(d * detInv) % 26, (-b * detInv) % 26],
    [(-c * detInv) % 26, (a * detInv) % 26]
  ].map(row => row.map(x => ((x % 26) + 26) % 26));
}

function textToNumbers(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "").split("").map(ch => ch.charCodeAt(0) - 65);
}

function numbersToText(numbers) {
  return numbers.map(num => String.fromCharCode((num % 26) + 65)).join("");
}

export default function HillCipher() {
  const [keyMatrixStr, setKeyMatrixStr] = useState("3,3;2,5");
  const [inputText, setInputText] = useState("HELLO");
  const [mode, setMode] = useState("encode");
  const [result, setResult] = useState("");

  const handleCompute = () => {
    try {
      const key = parseMatrix(keyMatrixStr);
      const n = key.length;
      let text = inputText.toUpperCase().replace(/[^A-Z]/g, "");
      // Pad text if needed
      while (text.length % n !== 0) {
        text += "X";
      }
      const blocks = [];
      for (let i = 0; i < text.length; i += n) {
        blocks.push(text.slice(i, i + n));
      }
      let output = "";
      if (mode === "encode") {
        blocks.forEach(block => {
          const nums = textToNumbers(block);
          const prod = multiply(key, nums);
          const modNums = prod.map(x => ((Math.round(x) % 26) + 26) % 26);
          output += numbersToText(modNums);
        });
      } else {
        // Decode: compute inverse key mod 26
        const invKey = matrixInverseMod26(key);
        blocks.forEach(block => {
          const nums = textToNumbers(block);
          const prod = multiply(invKey, nums);
          const modNums = prod.map(x => ((Math.round(x) % 26) + 26) % 26);
          output += numbersToText(modNums);
        });
      }
      setResult(output);
    } catch (error) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Hill Cipher (Matrix Encoding/Decoding)</h2>
      <p>
        Enter a key matrix (2x2 only, rows separated by semicolons, elements by commas) and text.
        For encoding, the text will be divided into blocks and padded with "X" if needed.
      </p>
      <div>
        <label>Key Matrix: </label>
        <input
          type="text"
          value={keyMatrixStr}
          onChange={(e) => setKeyMatrixStr(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </div>
      <div>
        <label>Text: </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </div>
      <div>
        <label>Mode: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>
      <button onClick={handleCompute} style={{ marginTop: "10px", padding: "8px 16px" }}>Compute</button>
      {result && (
        <div style={{ marginTop: "20px", background: "#fdfdfd", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}>
          <p><strong>Result:</strong> {result}</p>
        </div>
      )}
    </div>
  );
}
