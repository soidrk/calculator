import { useState } from 'react';
import { parseMatrix, hillCipherEncode, hillCipherDecode } from '../../utils/calculations';

export default function EncodingDecodingPage() {
  const [matrixStr, setMatrixStr] = useState('');
  const [text, setText] = useState('');
  const [mode, setMode] = useState('encode');
  const [result, setResult] = useState(null);

  const handleCompute = () => {
    try {
      const key = parseMatrix(matrixStr);
      if (mode === 'encode') {
        const encoded = hillCipherEncode(text, key);
        setResult(encoded);
      } else {
        const decoded = hillCipherDecode(text, key);
        setResult(decoded);
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Matrix Encoding/Decoding (Hill Cipher)</h2>
      <p>
        Enter a key matrix in row-semicolon format (e.g. 2x2 or 3x3).
        <br/>Then enter plaintext (to encode) or ciphertext (to decode).
      </p>
      <textarea
        rows={3}
        cols={30}
        value={matrixStr}
        onChange={(e) => setMatrixStr(e.target.value)}
        placeholder="e.g. '3,3;2,5' for a 2x2"
      />
      <br/>
      <label>Text:</label><br/>
      <textarea
        rows={3}
        cols={30}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="HELLO"
      />
      <br/>
      <label>Mode:</label>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="encode">Encode (Plaintext {'->'} Ciphertext)</option>
<option value="decode">Decode (Ciphertext {'->'} Plaintext)</option>
      </select>
      <br/>
      <button onClick={handleCompute}>Compute</button>

      {result && (
        <div style={{ marginTop: '1em' }}>
          <h4>Result:</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
