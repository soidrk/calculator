import Link from 'next/link';

export default function LimitsHome() {
  return (
    <div>
      <h2>Limits Calculators</h2>
      <ul>
        <li><Link href="/calculus/limits/limit-at-point">Limit at a Point</Link></li>
        <li><Link href="/calculus/limits/limit-at-infinity">Limit at Infinity</Link></li>
        <li><Link href="/calculus/limits/piecewise-limit">Piecewise Limit</Link></li>
      </ul>
    </div>
  );
}
