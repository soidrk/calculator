import Link from 'next/link';

export default function FinancialHome() {
  return (
    <div>
      <h2>Financial Calculators</h2>
      <ul>
        <li><Link href="/financial/loan">Loan Calculator</Link></li>
        <li><Link href="/financial/investment">Investment Calculator</Link></li>
      </ul>
    </div>
  );
}
