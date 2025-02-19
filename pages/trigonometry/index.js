import Link from 'next/link';

export default function TrigonometryHome() {
  return (
    <div>
      <h2>Trigonometry Calculators</h2>
      <ul>
        <li><Link href="/trigonometry/sine">Sine Calculator</Link></li>
        <li><Link href="/trigonometry/cosine">Cosine Calculator</Link></li>
      </ul>
    </div>
  );
}
