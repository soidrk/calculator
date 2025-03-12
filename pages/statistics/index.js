// pages/statistics/index.js
import Link from "next/link";

export default function StatisticsLanding() {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Statistics</h2>
      <p>Select the type of statistics view you’d like:</p>
      <ul>
        <li><Link href="/statistics/summary">Basic Summary Statistics</Link></li>
        <li><Link href="/statistics/advanced">Advanced Statistics Dashboard</Link></li>
      </ul>
    </div>
  );
}
