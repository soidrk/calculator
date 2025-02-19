import { useState } from 'react';
import { loanPayment } from '../../utils/calculations';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [payment, setPayment] = useState(null);

  const handleCalculate = () => {
    try {
      const monthlyPayment = loanPayment(principal, annualRate, years);
      setPayment(monthlyPayment);
    } catch (error) {
      setPayment('Invalid input');
    }
  };

  return (
    <div>
      <h2>Loan Calculator</h2>
      <p>Calculate your monthly loan payment:</p>
      <input 
        type="number" 
        value={principal} 
        onChange={(e) => setPrincipal(e.target.value)} 
        placeholder="Principal amount" 
      />
      <input 
        type="number" 
        value={annualRate} 
        onChange={(e) => setAnnualRate(e.target.value)} 
        placeholder="Annual interest rate (%)" 
      />
      <input 
        type="number" 
        value={years} 
        onChange={(e) => setYears(e.target.value)} 
        placeholder="Loan term (years)" 
      />
      <button onClick={handleCalculate}>Calculate Payment</button>
      {payment !== null && (
        <p>Your monthly payment is approximately {typeof payment === 'number' ? payment.toFixed(2) : payment}.</p>
      )}
    </div>
  );
}
