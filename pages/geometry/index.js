import Link from 'next/link';

export default function GeometryHome() {
  return (
    <div>
      <h2>Geometry Calculators</h2>
      <ul>
        <li><Link href="/geometry/area">Area Calculator</Link></li>
        <li><Link href="/geometry/volume">Volume Calculator</Link></li>
      </ul>
    </div>
  );
}
