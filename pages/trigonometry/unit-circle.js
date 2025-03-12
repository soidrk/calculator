// pages/trigonometry/unit-circle.js
import { useState } from "react";

export default function UnitCircle() {
  const [angle, setAngle] = useState(0);

  const rad = (angle * Math.PI) / 180;
  const sinVal = Math.sin(rad).toFixed(4);
  const cosVal = Math.cos(rad).toFixed(4);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Unit Circle Visualizer</h2>
      <svg width="300" height="300">
        {/* Draw circle */}
        <circle cx="150" cy="150" r="100" stroke="black" strokeWidth="2" fill="none" />
        {/* X and Y axes */}
        <line x1="0" y1="150" x2="300" y2="150" stroke="#ccc" strokeWidth="1" />
        <line x1="150" y1="0" x2="150" y2="300" stroke="#ccc" strokeWidth="1" />
        {/* Point on circle */}
        <circle
          cx={150 + 100 * Math.cos(rad)}
          cy={150 - 100 * Math.sin(rad)}
          r="5"
          fill="red"
        />
        {/* Radius line */}
        <line
          x1="150"
          y1="150"
          x2={150 + 100 * Math.cos(rad)}
          y2={150 - 100 * Math.sin(rad)}
          stroke="red"
          strokeWidth="2"
        />
      </svg>
      <div style={{ marginTop: "20px" }}>
        <label>
          Angle (degrees):{" "}
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <p>
          sin({angle}°) = {sinVal} &nbsp;&nbsp; cos({angle}°) = {cosVal}
        </p>
      </div>
      <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "600px", margin: "auto" }}>
        <h3>Explanation</h3>
        <p>
          The unit circle is a circle of radius 1 (here scaled to 100 pixels for visualization). As the angle changes,
          the coordinates of the point on the circle are (cosθ, sinθ). Adjust the angle input to see how sine and cosine change.
        </p>
      </div>
    </div>
  );
}
