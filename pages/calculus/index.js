import Link from 'next/link';

export default function CalculusHome() {
  return (
    <div>
      <h2>Calculus Calculators</h2>
      <ul>
        <li><Link href="/calculus/derivative">Derivative Calculator</Link></li>
        <li><Link href="/calculus/integral">Integral Calculator</Link></li>
        <li><Link href="/calculus/higher-derivatives">Higher Derivatives</Link></li>
        <li><Link href="/calculus/limits">Limits</Link></li>
      </ul>
    </div>
  );
}
