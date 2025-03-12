// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Welcome to the Mega Calculator</h2>
      <p>Select a category:</p>
      <ul>
        <li><Link href="/conversions">Conversions</Link></li>
        <li><Link href="/calculus">Calculus</Link></li>
        <li><Link href="/financial">Financial</Link></li>
        <li><Link href="/statistics">Statistics</Link></li>
        <li><Link href="/trigonometry">Trigonometry</Link></li>
        <li><Link href="/geometry">Geometry</Link></li>
        <li><Link href="/algebra">Algebra</Link></li>
        <li><Link href="/arithmetic">Arithmetic</Link></li>
        <li><Link href="/matrices">Matrices</Link></li>
        <li><Link href="/graphing">Graphing</Link></li>
        <li><Link href="/recommendations">Recommendations Forum</Link></li>
      </ul>
    </div>
  );
}
