// pages/trigonometry/law-of-sines.js
import { useState } from "react";

export default function LawOfSines() {
  const [angleA, setAngleA] = useState("");
  const [sideA, setSideA] = useState("");
  const [angleB, setAngleB] = useState("");
  const [sideB, setSideB] = useState("");
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState("");

  const handleCalculate = () => {
    // Law of Sines: a/sin(A) = b/sin(B)
    // We can solve for missing side or angle.
    const A = parseFloat(angleA);
    const a = parseFloat(sideA);
    const B = parseFloat(angleB);
    const b = parseFloat(sideB);
    let res = null;
    let expl = "";
    if (!isNaN(a) && !isNaN(A) && !isNaN(B) && isNaN(b)) {
      // Solve for b: b = a * sin(B)/sin(A)
      res = a * Math.sin((B * Math.PI) / 180) / Math.sin((A * Math.PI) / 180);
      expl = `Using the Law of Sines: a/sin(A) = b/sin(B), we rearrange to get b = a·(sin(B)/sin(A)). Substituting a = ${a}, A = ${A}°, and B = ${B}° gives b ≈ ${res.toFixed(4)}.`;
    } else if (!isNaN(b) && !isNaN(B) && !isNaN(A) && isNaN(a)) {
      // Solve for a: a = b * sin(A)/sin(B)
      res = b * Math.sin((A * Math.PI) / 180) / Math.sin((B * Math.PI) / 180);
      expl = `Using the Law of Sines: a/sin(A) = b/sin(B), we rearrange to get a = b·(sin(A)/sin(B)). Substituting b = ${b}, A = ${A}°, and B = ${B}° gives a ≈ ${res.toFixed(4)}.`;
    } else {
      expl = "Please enter exactly three values (two known and one unknown) so the missing value can be computed.";
    }
    setResult(res);
    setExplanation(expl);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Law of Sines Calculator</h2>
      <p>
        Enter two angles and one side (or two sides and one angle) to solve for the missing value using the Law of Sines.
      </p>
      <div>
        <label>Angle A (°): </label>
        <input type="number" value={angleA} onChange={(e) => setAngleA(e.target.value)} />
      </div>
      <div>
        <label>Side a: </label>
        <input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} />
      </div>
      <div>
        <label>Angle B (°): </label>
        <input type="number" value={angleB} onChange={(e) => setAngleB(e.target.value)} />
      </div>
      <div>
        <label>Side b: </label>
        <input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} />
      </div>
      <button onClick={handleCalculate} style={{ marginTop: "10px" }}>Calculate</button>
      {result !== null && (
        <div style={{ marginTop: "20px", background: "#f9f9f9", padding: "10px", borderRadius: "4px" }}>
          <p><strong>Result:</strong> {result.toFixed(4)}</p>
          <p><em>Explanation:</em> {explanation}</p>
        </div>
      )}
    </div>
  );
}
