import Link from 'next/link';

export default function AlgebraHome() {
  return (
    <div>
      <h2>Algebra Calculators</h2>
      <ul>
        <li><Link href="/algebra/quadratic">Quadratic Equation Solver</Link></li>
      </ul>
    </div>
  );
}
