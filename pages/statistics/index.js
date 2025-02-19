import Link from 'next/link';

export default function StatisticsHome() {
  return (
    <div>
      <h2>Statistics Calculators</h2>
      <ul>
        <li><Link href="/statistics/mean">Mean Calculator</Link></li>
        <li><Link href="/statistics/median">Median Calculator</Link></li>
      </ul>
    </div>
  );
}
