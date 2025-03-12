// pages/trigonometry/index.js
import Link from "next/link";

export default function TrigonometryHome() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Trigonometry Tools</h2>
      <ul>
        <li><Link href="/trigonometry/unit-circle">Unit Circle Visualizer</Link></li>
        <li><Link href="/trigonometry/law-of-sines">Law of Sines Calculator</Link></li>
        <li><Link href="/trigonometry/law-of-cosines">Law of Cosines Calculator</Link></li>
        <li><Link href="/trigonometry/triangle-solver">Triangle Solver</Link></li>
        <li><Link href="/trigonometry/identities">Trig Identities Simplifier</Link></li>
      </ul>
    </div>
  );
}
