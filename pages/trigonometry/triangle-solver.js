// pages/trigonometry/triangle-solver.js
import { useState } from "react";

export default function TriangleSolver() {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [angleA, setAngleA] = useState("");
  const [angleB, setAngleB] = useState("");
  const [angleC, setAngleC] = useState("");
  const [solution, setSolution] = useState(null);
  const [explanation, setExplanation] = useState("");

  // For demonstration, we will assume a right triangle if one angle is 90°
  const handleSolve = () => {
    // Convert to numbers where provided
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);
    const A = parseFloat(angleA);
    const B = parseFloat(angleB);
    const C = parseFloat(angleC);
    let sol = {};
    let expl = "";
    // Simplest case: right triangle where one angle is 90° (if any angle is 90)
    if (!isNaN(A) && Math.abs(A - 90) < 1e-3) {
      // Then B and C are complementary; use Pythagoras if two sides are known.
      if (!isNaN(a) && !isNaN(b) && isNaN(c)) {
        sol.c = Math.sqrt(a * a + b * b);
        expl = `Since angle A is 90°, we have a right triangle. Using the Pythagorean theorem: c = √(a² + b²).`;
      }
    }
    // Otherwise, if two angles are known, the third can be computed:
    if (!isNaN(A) && !isNaN(B) && isNaN(C)) {
      sol.C = 180 - A - B;
      expl += `Since A and B are known, angle C = 180 - A - B = ${sol.C.toFixed(2)}°.`;
    }
    // If two sides and one non‑right angle are known, use Law of Sines:
    if (!isNaN(a) && !isNaN(angleA) && !isNaN(b) && isNaN(sideC)) {
      sol.c = (a * Math.sin((B * Math.PI) / 180)) / Math.sin((A * Math.PI) / 180);
      expl += ` Using the Law of Sines: c = a·(sin(B)/sin(A)).`;
    }
    // (More cases can be added for a full triangle solver.)
    setSolution(sol);
    setExplanation(expl || "Insufficient or ambiguous data provided for a complete solution.");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Triangle Solver</h2>
      <p>
        Enter known sides and angles (in degrees). You may leave one field blank to have it computed.
        (This is a simplified solver that uses right triangle formulas or the Law of Sines.)
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
        <label>Side c: </label>
        <input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} />
      </div>
      <div>
        <label>Angle A (°): </label>
        <input type="number" value={angleA} onChange={(e) => setAngleA(e.target.value)} />
      </div>
      <div>
        <label>Angle B (°): </label>
        <input type="number" value={angleB} onChange={(e) => setAngleB(e.target.value)} />
      </div>
      <div>
        <label>Angle C (°): </label>
        <input type="number" value={angleC} onChange={(e) => setAngleC(e.target.value)} />
      </div>
      <button onClick={handleSolve} style={{ marginTop: "10px" }}>Solve Triangle</button>
      {solution && (
        <div style={{ marginTop: "20px", background: "#f9f9f9", padding: "10px", borderRadius: "4px" }}>
          <h4>Solution:</h4>
          <pre>{JSON.stringify(solution, null, 2)}</pre>
          <p><em>Explanation:</em> {explanation}</p>
        </div>
      )}
    </div>
  );
}
