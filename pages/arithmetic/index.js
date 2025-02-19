import Link from 'next/link';

export default function ArithmeticHome() {
  return (
    <div>
      <h2>Arithmetic Calculators</h2>
      <ul>
        <li><Link href="/arithmetic/basic">Basic Arithmetic Calculator</Link></li>
        <li><Link href="/arithmetic/percentage">Percentage Calculator</Link></li>
      </ul>
    </div>
  );
}
