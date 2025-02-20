// pages/algebra/index.js
import Link from 'next/link';

export default function AlgebraHome() {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Algebra Calculators</h2>
      <p>Welcome to the Algebra section. Choose a tool below:</p>
      <ul>
        <li>
          <Link href="/algebra/quadratic">Quadratic Equation Solver</Link>
        </li>
        <li>
          <Link href="/algebra/equation-solver">Equation Solver</Link>
        </li>
        {/* */}
      </ul>
    </div>
  );
}
