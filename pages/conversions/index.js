import Link from 'next/link';

export default function ConversionsHome() {
  return (
    <div>
      <h2>Conversions Calculators</h2>
      <ul>
        <li><Link href="/conversions/length">Length Conversion</Link></li>
        <li><Link href="/conversions/temperature">Temperature Conversion</Link></li>
      </ul>
    </div>
  );
}
