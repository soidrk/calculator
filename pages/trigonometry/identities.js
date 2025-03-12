// pages/trigonometry/identities.js
import { useState } from "react";
import { simplify } from "mathjs";

export default function TrigIdentities() {
  const [expression, setExpression] = useState("");
  const [simplified, setSimplified] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleSimplify = () => {
    try {
      const simp = simplify(expression).toString();
      setSimplified(simp);
      setExplanation(
        `The expression "${expression}" has been simplified using standard trigonometric identities.`
      );
    } catch (e) {
      setSimplified("");
      setExplanation("Error simplifying the expression. Please check your input.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Trigonometric Identities Simplifier</h2>
      <p>
        Enter a trigonometric expression (e.g., sin(x)^2 + cos(x)^2) to simplify it using standard identities.
      </p>
      <textarea
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "8px" }}
        placeholder='Example: sin(x)^2 + cos(x)^2'
      ></textarea>
      <br />
      <button onClick={handleSimplify} style={{ marginTop: "10px", padding: "8px 16px" }}>Simplify Expression</button>
      {simplified && (
        <div style={{ marginTop: "20px", background: "#eef", padding: "10px", borderRadius: "4px" }}>
          <p><strong>Simplified Expression:</strong> {simplified}</p>
          <p><em>Explanation:</em> {explanation}</p>
        </div>
      )}
    </div>
  );
}
