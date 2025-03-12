// pages/trigonometry/law-of-cosines.js
import { useState } from "react";

export default function LawOfCosines() {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [angleC, setAngleC] = useState("");
  const [sideC, setSideC] = useState("");
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState("");

  const handleCalculate = () => {
    // Law of Cosines: c² = a² + b² − 2ab·cos(C)
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const C = parseFloat(angleC);
    const c = parseFloat(sideC);
    let res = null;
    let expl = "";
    if (!isNaN(a) && !isNaN(b) && !isNaN(C) && isNaN(c)) {
      // Solve for c
      res = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos((C * Math.PI) / 180));
      expl = `Using the Law of Cosines: c² = a² + b² − 2ab·cos(C), we compute c = √(a² + b² − 2ab·cos(C)). With a = ${a}, b = ${b}, C = ${C}°, we get c ≈ ${res.toFixed(4)}.`;
    } else if (!isNaN(c) && !isNaN(a) && !isNaN(b) && isNaN(C)) {
      // Solve for C: cos(C) = (a² + b² − c²)/(2ab)
      const cosC = (a * a + b * b - c * c) / (2 * a * b);
      const Ccalc = Math.acos(cosC) * (180 / Math.PI);
      res = Ccalc;
      expl = `Rearranging the Law of Cosines: cos(C) = (a² + b² − c²)/(2ab). With a = ${a}, b = ${b}, c = ${c}, we find C ≈ ${res.toFixed(4)}°.`;
    } else {
      expl = "Please leave one variable blank to compute it.";
    }
    setResult(res);
    setExplanation(expl);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Law of Cosines Calculator</h2>
      <p>
        Enter two sides and the included angle to solve for the third side, or enter all three sides to solve for the included angle.
      </p>
      <div>
        <label>Side a: </label>
        <input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} />
      </div>
      <div>
        <label>Side b: </label>
        <input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} />
      </div>
      <div>
        <label>Angle C (°): </label>
        <input type="number" value={angleC} onChange={(e) => setAngleC(e.target.value)} />
      </div>
      <div>
        <label>Side c: </label>
        <input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} />
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
